const Method = (data) => {
  var data2 = [];
  for (var i = 0; i < data.length; i++) {
    data2.push({
      latitude: Number(data[i].lat),
      longitude: Number(data[i].lng),
    });
  }
  return data2;
};
export default Method;
