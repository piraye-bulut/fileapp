import React, { useState, useEffect } from 'react';
import { useAuth } from '../contexts/AuthContext';
import { db } from '../firebase';
import { collection, query, where, getDocs, updateDoc, doc, deleteDoc } from 'firebase/firestore';


export const ReceivedFiles = () => {
  const [files, setFiles] = useState([]);
  const [selectedFile, setSelectedFile] = useState(null);
  const { currentUser } = useAuth();

  useEffect(() => {
    const fetchFiles = async () => {
      if (!currentUser) return;

      const filesRef = collection(db, 'files');
      const q = query(filesRef, where('recipientEmail', '==', currentUser.email));
      const querySnapshot = await getDocs(q);

      const filesList = querySnapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data(),
        viewed: doc.data().viewed || false, // Eğer `viewed` alanı yoksa varsayılan olarak `false` yap
      }));
      setFiles(filesList);
    };

    fetchFiles();
  }, [currentUser]);

  const handleFileClick = async (file) => {
    // Dosya seçildiğinde, `viewed` alanını `true` olarak ayarla
    const fileRef = doc(db, 'files', file.id);
    await updateDoc(fileRef, { viewed: true });
    setSelectedFile({ ...file, viewed: true });

    // Dosyayı listede de güncelle
    setFiles(files.map(f => (f.id === file.id ? { ...f, viewed: true } : f)));
  };

  const handleDeleteFile = async (fileId) => {
    if (window.confirm('Bu dosyayı silmek istediğinizden emin misiniz?')) {
      await deleteDoc(doc(db, 'files', fileId));

      // Silinen dosyayı listeden kaldır
      const updatedFiles = files.filter(file => file.id !== fileId);
      setFiles(updatedFiles);

      setSelectedFile(null);
    }
  };

  return (
    <div className="flex flex-col min-h-screen bg-gray-100 dark:bg-gray-800">
     
      <div className="flex flex-grow">
        {/* Mail listesi */}
        <div className="w-1/3 p-4 overflow-y-auto border-r border-gray-200 dark:border-gray-700">
          <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-4">Gelen Dosyalar</h3>
          <ul className="space-y-2">
            {files.length > 0 ? (
              files.map((file, index) => (
                <li
                  key={index}
                  onClick={() => handleFileClick(file)}
                  className={`p-2 cursor-pointer rounded-lg flex items-center justify-between ${selectedFile?.id === file.id ? 'bg-blue-500 text-white' : 'text-gray-900 dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700'}`}
                >
                  <div className="flex items-center">
                    {!file.viewed && <span className="w-2.5 h-2.5 rounded-full bg-blue-500 mr-2" />} {/* Mavi nokta eğer dosya okunmamışsa */}
                    <div>
                      <p className="font-semibold">{file.fileName}</p>
                      <p className="text-sm">{file.senderEmail}</p>
                    </div>
                  </div>
                  <button
                    onClick={(e) => { e.stopPropagation(); handleDeleteFile(file.id); }}
                    className="ml-auto text-red-500 hover:text-red-700 border border-red-500 rounded px-2 py-0.5"
                  >
                    Sil
                  </button>
                </li>
              ))
            ) : (
              <p className="text-gray-900 dark:text-white">Henüz gelen bir dosyanız yok.</p>
            )}
          </ul>
        </div>
        
        {/* Seçilen dosyanın içeriği */}
        <div className="w-2/3 p-4 overflow-y-auto">
          {selectedFile ? (
            <div>
              <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-4">Dosya Detayları</h3>
              <p><strong>Dosya Adı:</strong> {selectedFile.fileName}</p>
              <p><strong>Gönderen:</strong> {selectedFile.senderEmail}</p>
              <p><strong>Alıcı:</strong> {selectedFile.recipientEmail}</p>
              <p><strong>Tarih:</strong> {new Date(selectedFile.timestamp.seconds * 1000).toLocaleString()}</p>
              <a href={selectedFile.fileBase64} download={selectedFile.fileName} className="text-blue-500 hover:underline">
                Dosyayı İndir
              </a>
            </div>
          ) : (
            <p className="text-gray-900 dark:text-white">Bir dosya seçin.</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default ReceivedFiles;