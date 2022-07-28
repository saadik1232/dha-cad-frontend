const Data = {
  // Ip: "192.168.43.96",
  // Ip: "192.168.100.107",
  // Ip: "182.184.65.213",
  Ip: "192.168.1.13",
  Port: 3001,
  Protocol: "http",
};

export const Url = Data.Protocol + "://" + Data.Ip + ":" + Data.Port + "/";
export const Traccar = "https://trac.dextrologix.com/api/";
// export const Traccar = "http://192.168.50.41:8082/api/";
export const KEY = "123456"; // JWT Secret KEY
export const Min = 10; // JWT KEY Expiry
export default Data;
