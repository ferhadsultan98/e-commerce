import { useNavigate } from 'react-router-dom';
import '../../Styles/BackButton.scss';

const BackButton = () => {
  const navigate = useNavigate();

  const handleBack = () => {
    navigate(-1); // Bir önceki sayfaya geri gider
  };

  return (
    <button className={styles.backButton} onClick={handleBack}>
      <svg
        className=backIcon
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <path d="M15 18l-6-6 6-6" />
      </svg>
      Geri
    </button>
  );
};

export default BackButton;