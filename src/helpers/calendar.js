export const rowClassToggle = (rowNumber) => {
  switch (rowNumber) {
    case 1:
      return "row-start-1";
      break;
    case 2:
      return "row-start-2";
      break;
    case 3:
      return "row-start-3";
      break;
    case 4:
      return "row-start-4";
      break;
    case 5:
      return "row-start-5";
      break;
    case 6:
      return "row-start-6";
      break;
  }
};

export const colClassToggle = (colNumber) => {
    switch (colNumber) {
      case 1:
        return "col-start-1";
        break;
      case 2:
        return "col-start-2";
        break;
      case 3:
        return "col-start-3";
        break;
      case 4:
        return "col-start-4";
        break;
      case 5:
        return "col-start-5";
        break;
      case 6:
        return "col-start-6";
        break;
    }
  };