import { useNavigate } from "react-router-dom";
import {
  BackgroundImage,
  DirectoryBodyContainer,
  DirectoryItemContainer,
} from "./directory-item.styles.js";

function DirectoryItem({ title, imageUrl, route }) {
  const navigate = useNavigate();

  const handleNavigation = () => navigate(route);
  return (
    <DirectoryItemContainer onClick={handleNavigation}>
      <BackgroundImage backgroundImage={imageUrl} />
      <DirectoryBodyContainer>
        <h2>{title}</h2>
        <p>Shop Now</p>
      </DirectoryBodyContainer>
    </DirectoryItemContainer>
  );
}

export default DirectoryItem;
