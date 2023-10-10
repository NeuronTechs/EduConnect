import ContentCart from "../components/CoursesCart/ContentCart";
import HeaderCart from "../components/CoursesCart/HeaderCart";

const CoursesCart = () => {
  return (
    <div className="w-full h-screen overflow-x-hidden overflow-y-auto">
      <HeaderCart />
      <ContentCart />
    </div>
  );
};
export default CoursesCart;
