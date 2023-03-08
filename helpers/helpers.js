//calculates the "to" date 
const calculateTimeMax = (eventDate) => {
  const months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
  let splitDate = eventDate.split("%");
  let maxDay;
  let maxMonth;
  let maxYear = eventDate.split(" ")[2];
  console.log("splitDate first", splitDate);
  if (Number(eventDate.split(" ")[0]) === 31 && eventDate.split(" ")[1] === "December"){
    maxDay = 1;
    maxMonth = "January";
    maxYear = Number(eventDate.split(" ")[2]) + 1;
  } else if (Number(eventDate.split(" ")[0]) === 31 && (eventDate.split(" ")[1] === "January" || eventDate.split(" ")[1] === "March" || eventDate.split(" ")[1] === "May" || eventDate.split(" ")[1] === "July" || eventDate.split(" ")[1] === "August" || eventDate.split(" ")[1] === "October" || eventDate.split(" ")[1] === "December")) {
    maxDay = 1;
    maxMonth = months[months.indexOf(eventDate.split(" ")[1]) === 'December' ? months[0] : (months.indexOf(eventDate.split(" ")[1]) + 1)]
  } else if (Number(eventDate.split(" ")[0]) === 30 && (eventDate.split(" ")[1] === "February" || eventDate.split(" ")[1] === "April" || eventDate.split(" ")[1] === "June" || eventDate.split(" ")[1] === "September" || eventDate.split(" ")[1] === "November")){
    maxDay = 1;
    maxMonth = months[months.indexOf(eventDate.split(" ")[1]) === 11 ? months[0] : (months.indexOf(eventDate.split(" ")[1]) + 1)]
  } else {
    maxDay = Number(eventDate.split(" ")[0]) + 1;
    maxMonth = splitDate[1];
  }
  splitDate[0] = maxDay;
  splitDate[1] = maxMonth;
  splitDate[2] = maxYear;
  console.log("splitDate", splitDate);
  return splitDate.join(" ");
}

export {calculateTimeMax}

