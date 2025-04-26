import React, { useState, useEffect } from 'react';
import { getFirestore, collection, onSnapshot, addDoc, updateDoc, deleteDoc, doc } from 'firebase/firestore';
import { getStorage, ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import { app } from '../../../server/server';
import './AdminSlider.scss';

const AdminSlider = () => {
  const [leftSlides, setLeftSlides] = useState([]);
  const [rightSlides, setRightSlides] = useState([]);
  const [newSlide, setNewSlide] = useState({ title: '', image: null, sliderType: 'left' });
  const [editSlide, setEditSlide] = useState(null);
  
  const db = getFirestore(app);
  const storage = getStorage(app);

  useEffect(() => {
    const unsubscribeLeft = onSnapshot(collection(db, 'leftSlides'), (snapshot) => {
      const slidesData = snapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      }));
      setLeftSlides(slidesData);
    });

    const unsubscribeRight = onSnapshot(collection(db, 'rightSlides'), (snapshot) => {
      const slidesData = snapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      }));
      setRightSlides(slidesData);
    });

    return () => {
      unsubscribeLeft();
      unsubscribeRight();
    };
  }, [db]);

  const handleImageUpload = async (file) => {
    if (!file) return null;
    const storageRef = ref(storage, `slides/${file.name}`);
    await uploadBytes(storageRef, file);
    return await getDownloadURL(storageRef);
  };

  const handleAddSlide = async (e) => {
    e.preventDefault();
    if (!newSlide.title || !newSlide.image) return;

    const imageUrl = await handleImageUpload(newSlide.image);
    const collectionName = newSlide.sliderType === 'left' ? 'leftSlides' : 'rightSlides';
    
    await addDoc(collection(db, collectionName), {
      title: newSlide.title,
      image: imageUrl
    });

    setNewSlide({ title: '', image: null, sliderType: 'left' });
  };

  const handleEditSlide = async (e) => {
    e.preventDefault();
    if (!editSlide.title) return;

    const collectionName = editSlide.sliderType === 'left' ? 'leftSlides' : 'rightSlides';
    const slideRef = doc(db, collectionName, editSlide.id);
    
    const updateData = { title: editSlide.title };
    if (editSlide.image) {
      updateData.image = await handleImageUpload(editSlide.image);
    }

    await updateDoc(slideRef, updateData);
    setEditSlide(null);
  };

  const handleDeleteSlide = async (id, sliderType) => {
    const collectionName = sliderType === 'left' ? 'leftSlides' : 'rightSlides';
    await deleteDoc(doc(db, collectionName, id));
  };

  return (
    <div className="adminContainer">
      <h2 className="adminTitle">Manage Sliders</h2>
      
      <div className="addSlideForm">
        <h3>Add New Slide</h3>
        <form onSubmit={handleAddSlide}>
          <input
            type="text"
            placeholder="Slide Title"
            value={newSlide.title}
            onChange={(e) => setNewSlide({ ...newSlide, title: e.target.value })}
            className="inputField"
          />
          <input
            type="file"
            accept="image/*"
            onChange={(e) => setNewSlide({ ...newSlide, image: e.target.files[0] })}
            className="inputFile"
          />
          <select
            value={newSlide.sliderType}
            onChange={(e) => setNewSlide({ ...newSlide, sliderType: e.target.value })}
            className="selectField"
          >
            <option value="left">Left Slider</option>
            <option value="right">Right Slider</option>
          </select>
          <button type="submit" className="submitButton">Add Slide</button>
        </form>
      </div>

      {editSlide && (
        <div className="editSlideForm">
          <h3>Edit Slide</h3>
          <form onSubmit={handleEditSlide}>
            <input
              type="text"
              placeholder="Slide Title"
              value={editSlide.title}
              onChange={(e) => setEditSlide({ ...editSlide, title: e.target.value })}
              className="inputField"
            />
            <input
              type="file"
              accept="image/*"
              onChange={(e) => setEditSlide({ ...editSlide, image: e.target.files[0] })}
              className="inputFile"
            />
            <button type="submit" className="submitButton">Update Slide</button>
            <button
              type="button"
              onClick={() => setEditSlide(null)}
              className="cancelButton"
            >
              Cancel
            </button>
          </form>
        </div>
      )}

      <div className="slidesList">
        <h3>Left Slider</h3>
        {leftSlides.map(slide => (
          <div key={slide.id} className="slideItem">
            <img src={slide.image} alt={slide.title} className="slideImage" />
            <span>{slide.title}</span>
            <button
              onClick={() => setEditSlide({ ...slide, sliderType: 'left' })}
              className="editButton"
            >
              Edit
            </button>
            <button
              onClick={() => handleDeleteSlide(slide.id, 'left')}
              className="deleteButton"
            >
              Delete
            </button>
          </div>
        ))}

        <h3>Right Slider</h3>
        {rightSlides.map(slide => (
          <div key={slide.id} className="slideItem">
            <img src={slide.image} alt={slide.title} className="slideImage" />
            <span>{slide.title}</span>
            <button
              onClick={() => setEditSlide({ ...slide, sliderType: 'right' })}
              className="editButton"
            >
              Edit
            </button>
            <button
              onClick={() => handleDeleteSlide(slide.id, 'right')}
              className="deleteButton"
            >
              Delete
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AdminSlider;