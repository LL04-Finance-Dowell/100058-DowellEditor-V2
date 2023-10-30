export const finding_percent = (element, arg, width) => {
  // console.log("test element.width", element.width);
  // if (element.width > 100) {
  if (window.innerWidth < 993) {

    if (arg == "width") {
      return (element.width / 793.69) * 100 + "%"
    } else {
      return (element.left / 793.69) * width + "px"
    }
  }
  else {
    if (arg == "width") {
      return element.width + "px"
    } else {
      return element.left + "px"
    }
  }
  // }
  // else {
  //   if (arg == "width") {
  //     return element.width + "px"
  //   } else {
  //     return element.left + "px"
  //   }
  // }
}