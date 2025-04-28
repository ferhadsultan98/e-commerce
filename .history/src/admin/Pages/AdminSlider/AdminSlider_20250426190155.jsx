import React, { useState, useEffect } from 'react';
import { getFirestore, collection, onSnapshot, addDoc, updateDoc, deleteDoc, doc } from 'firebase/firestore';
import { toast } from 'react-toastify';
import { app } from '../../../server/server';
import './AdminSlider.scss';

const AdminSlider = () => {
  const [leftSlides, setLeftSlides] = useState([]);
  const [rightSlides, setRightSlides] = useState([]);
  const [newSlide, setNewSlide] = useState({ title: '', image: null, sliderType: 'left' });
  const [editSlide, setEditSlide] = useState(null);

  const db = getFirestore(app);
  const cloudinaryPreset = 'farhadsultan';
  const cloudinaryCloudName = 'dbiltdpxh';

  useEffect(() => {
    const unsubscribeLeft = onSnapshot(collection(db, 'leftSlides'), (snapshot) => {
      const slidesData = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      setLeftSlides(slidesData);
    });

    const unsubscribeRight = onSnapshot(collection(db, 'rightSlides'), (snapshot) => {
      const slidesData = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
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

    const formData = new FormData();
    formData.append('file', file);
    formData.append('upload_preset', cloudinaryPreset);

    try {
      const response = await fetch(
        `https://api.cloudinary.com/v1_1/${cloudinaryCloudName}/image/upload`,
        {
          method: 'POST',
          body: formData,
        }
      );
      const data = await response.json();
      if (data.secure_url) {
        return data.secure_url;
      } else {
        throw new Error('Cloudinary upload failed');
      }
    } catch (error) {
      toast.error('Image upload failed!');
      console.error('Cloudinary upload error:', error);
      return null;
    }
  };

  const handleAddSlide = async (e) => {
    e.preventDefault();
    if (!newSlide.title || !newSlide.image) {
      toast.error('Please provide a title and image!');
      return;
    }

    try {
      const imageUrl = await handleImageUpload(newSlide.image);
      if (!imageUrl) return;

      const collectionName = newSlide.sliderType === 'left' ? 'leftSlides' : 'rightSlides';
      await addDoc(collection(db, collectionName), {
        title: newSlide.title,
        image: imageUrl,
      });

      toast.success('Slide added successfully!');
      setNewSlide({ title: '', image: null, sliderType: 'left' });
    } catch (error) {
      toast.error('Failed to add slide!');
      console.error('Add slide error:', error);
    }
  };

  const handleEditSlide = async (e) => {
    e.preventDefault();
    if (!editSlide.title) {
      toast.error('Please provide a title!');
      return;
    }

    try {
      const collectionName = editSlide.sliderType === 'left' ? 'leftSlides' : 'rightSlides';
      const slideRef = doc(db, collectionName, editSlide.id);

      const updateData = { title: editSlide.title };
      if (editSlide.image) {
        const imageUrl = await handleImageUpload(editSlide.image);
        if (!imageUrl) return;
        updateData.image = imageUrl;
      }

      await updateDoc(slideRef, updateData);
      toast.success('Slide updated successfully!');
      setEditSlide(null);
    } catch (error) {
      toast.error('Failed to update slide!');
      console.error('Update slide error:', error);
    }
  };

  const handleDeleteSlide = async (id, sliderType) => {
    try {
      const collectionName = sliderType === 'left' ? 'leftSlides' : 'rightSlides';
      await deleteDoc(doc(db, collectionName, id));
      toast.success('Slide deleted successfully!');
    } catch (error) {
      toast.error('Failed to delete slide!');
      console.error('Delete slide error:', error);
    }
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
        {leftSlides.map((slide) => (
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
        {rightSlides.map((slide) => (
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