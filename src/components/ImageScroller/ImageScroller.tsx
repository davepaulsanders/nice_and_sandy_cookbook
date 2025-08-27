const ImageScroller = ({ images }) => {
  const handleClick = (e) => {
    console.log("clicked");
  };
  return (
    <ul>
      {images.map((i) => (
        <li onClick={handleClick} className="w-[200px] h-[300px]">
          <img width="200" height="300" src={i.Img} alt={i.Alt} />
          <input type="checkbox"></input>
        </li>
      ))}
    </ul>
  );
};
export default ImageScroller;
