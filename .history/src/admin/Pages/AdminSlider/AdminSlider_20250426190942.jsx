import React, { useState, useEffect, useRef } from 'react';
import { getFirestore, collection, onSnapshot, addDoc, updateDoc, deleteDoc, doc } from 'firebase/firestore';
import { toast } from 'react-toastify';
import { app } from '../../../server/server';
import './AdminSlider.scss';

const AdminSlider = () => {
  const [leftSlides, setLeftSlides] = useState([]);
  const [rightSlides, setRightSlides] = useState([]);
  const [newSlide, setNewSlide] = useState({
    title1: '',
    title2: '',
    title3: '',
    image1: null,
    image2: null,
    image3: null,
    sliderType: 'left',
  });
  const [editSlide, setEditSlide] = useState(null);

  const db = getFirestore(app);
  const cloudinaryPreset = 'farhadsultan';
  const cloudinaryCloudName = 'dbiltdpxh';

  // Refs for file inputs to reset them
  const image1Ref = useRef(null);
  const image2Ref = useRef(null);
  const image3Ref = useRef(null);

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

  const resetForm = () => {
    setNewSlide({
      title1: '',
      title2: '',
      title3: '',
      image1: null,
      image2: null,
      image3: null,
      sliderType: 'left',
    });
    if (image1Ref.current) image1Ref.current.value = '';
    if (image2Ref.current) image2Ref.current.value = '';
    if (image3Ref.current) image3Ref.current.value = '';
  };

  const handleAddSlide = async (e) => {
    e.preventDefault();
    if (
      !newSlide.title1 ||
      !newSlide.title2 ||
      !newSlide.title3 ||
      !newSlide.image1 ||
      !newSlide.image2 ||
      !newSlide.image3
    ) {
      toast.error('Please provide all titles and images!');
      return;
    }

    try {
      const imageUrl1 = await handleImageUpload(newSlide.image1);
      const imageUrl2 = await handleImageUpload(newSlide.image2);
      const imageUrl3 = await handleImageUpload(newSlide.image3);
      if (!imageUrl1 || !imageUrl2 || !imageUrl3) return;

      const collectionName = newSlide.sliderType === 'left' ? 'leftSlides' : 'rightSlides';
      await addDoc(collection(db, collectionName), {
        title1: newSlide.title1,
        title2: newSlide.title2,
        title3: newSlide.title3,
        image1: imageUrl1,
        image2: imageUrl2,
        image3: imageUrl3,
      });

      toast.success('Slide added successfully!');
      resetForm();
    } catch (error) {
      toast.error('Failed to add slide!');
      console.error('Add slide error:', error);
    }
  };

  const handleEditSlide = async (e) => {
    e.preventDefault();
    if (!editSlide.title1 || !editSlide.title2 || !editSlide.title3) {
      toast.error('Please provide all titles!');
      return;
    }

    try {
      const collectionName = editSlide.sliderType === 'left' ? 'leftSlides' : 'rightSlides';
      const slideRef = doc(db, collectionName, editSlide.id);

      const updateData = {
        title1: editSlide.title1,
        title2: editSlide.title2,
        title3: editSlide.title3,
      };
      if (editSlide.image1) {
        const imageUrl1 = await handleImageUpload(editSlide.image1);
        if (!imageUrl1) return;
        updateData.image1 = imageUrl1;
      }
      if (editSlide.image2) {
        const PRESimageUrl2 = await handleImageUpload(editSlide.image2);
        if (!imageUrl2) return;
        updateData.image2 = imageUrl2;
      }
      if (editSlide.image3) {
        const imageUrl3 = await handleImageUpload(editSlide.image3);
        if (!imageUrl3) return;
        updateData.image3 = imageUrl3;
      }

      await updateDoc(slideRef, updateData);
      toast.success('Slide updated successfully!');
      setEditSlide(null);
    } catch (error) {
      toast.error('Failed to update slide!');
      console.error('Update slide error:', error);
    }
  };

  const handleSliderTypeChange = (e) => {
    const sliderType = e.target.value;
    setNewSlide({
      title1: '',
      title2: '',
      title3: '',
      image1: null,
      image2: null,
      image3: null,
      sliderType,
    });
    if (image1Ref.current) image1Ref.current.value = '';
    if (image2Ref.current) image2Ref.current.value = '';
    if (image3Ref.current) image3Ref.current.value = '';
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
          <label>Title 1</label>
          <input
            type="text"
            placeholder="Title for Image 1"
            value={newSlide.title1}
            onChange={(e) => setNewSlide({ ...newSlide, title1: e.target.value })}
            className="inputField"
          />
          <label>Image 1</label>
          <input
            type="file"
            accept="image/*"
            ref={image1Ref}
            onChange={(e) => setNewSlide({ ...newSlide, image1: e.target.files[0] })}
            className="inputFile"
          />
          <label>Title 2</label>
          <input
            type="text"
            placeholder="Title for Image 2"
            value={newSlide.title2}
            onChange={(e) => setNewSlide({ ...newSlide, title2: e.target.value })}
            className="inputField"
          />
          <label>Image 2</label>
          <input
            type="file"
            accept="image/*"
            ref={image2Ref}
            onChange={(e) => setNewSlide({ ...newSlide, image2: e.target.files[0] })}
            className="inputFile"
          />
          <label>Title 3</label>
          <input
            type="text"
            placeholder="Title for Image 3"
            value={newSlide.title3}
            onChange={(e) => setNewSlide({ ...newSlide, title3: e.target.value })}
            className="inputField"
          />
          <label>Image 3</label>
          <input
            type="file"
            accept="image/*"
            ref={image3Ref}
            onChange={(e) => setNewSlide({ ...newSlide, image3: e.target.files[0] })}
            className="inputFile"
          />
          <select
            value={newSlide.sliderType}
            onChange={handleSliderTypeChange}
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
            <label>Title 1</label>
            <input
              type="text"
              placeholder="Title for Image 1"
              value={editSlide.title1}
              onChange={(e) => setEditSlide({ ...editSlide, title1: e.target.value })}
              className="inputField"
            />
            <label>Image 1 (optional)</label>
            <input
              type="file"
              accept="image/*"
              onChange={(e) => setEditSlide({ ...editSlide, image1: e.target.files[0] })}
              className="inputFile"
            />
            <label>Title 2</label>
            <input
              type="text"
              placeholder="Title for Image 2"
              value={editSlide.title2}
              onChange={(e) => setEditSlide({ ...editSlide, title2: e.target.value })}
              className="inputField"
            />
            <label>Image 2 (optional)</label>
            <input
              type="file"
              accept="image/*"
              onChange={(e) => setEditSlide({ ...editSlide, image2: e.target.files[0] })}
              className="inputFile"
            />
            <label>Title 3</label>
            <input
              type="text"
              placeholder="Title for Image 3"
              value={editSlide.title3}
              onChange={(e) => setEditSlide({ ...editSlide, title3: e.target.value })}
              className="inputField"
            />
            <label>Image 3 (optional)</label>
            <input
              type="file"
              accept="image/*"
              onChange={(e) => setEditSlide({ ...editSlide, image3: e.target.files[0] })}
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
            <div className="slideImages">
              <div className="imageContainer">
                <img src={slide.image1} alt={slide.title1} className="slideImage" />
                <span>{slide.title1}</span>
              </div>
              <div className="imageContainer">
                <img src={slide.image2} alt={slide.title2} className="slideImage" />
                <span>{slide.title2}</span>
              </div>
              <div className="imageContainer">
                <img src={slide.image3} alt={slide.title3} className="slideImage" />
                <span>{slide.title3}</span>
              </div>
            </div>
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
            <div className="slideImages">
              <div className="imageContainer">
                <img src={slide.image1} alt={slide.title1} className="slideImage" />
                <span>{slide.title1}</span>
              </div>
              <div className="imageContainer">
                <img src={slide.image2} alt={slide.title2} className="slideImage" />
                <span>{slide.title2}</span>
              </div>
              <div className="imageContainer">
                <img src={slide.image3} alt={slide.title3} className="slideImage" />
                <span>{slide.title3}</span>
              </div>
            </div>
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