export const finding_percent = (element, arg) => {
    if (window.innerWidth < 993) {

      if (arg == "width") {
        return (element.width / 794) * 100 + "%"
      } else {
        return (element.left / 794) * 100 + "%"
      }
    }
    else {
      if (arg == "width") {
        return element.width + "px"
      } else {
        return element.left + "px"
      }
    }
  }