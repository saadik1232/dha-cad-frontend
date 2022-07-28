//const ip = "192.168.100.109";
const ip = "192.168.1.13";
// const ip = "182.184.65.213";
const protocol = "http";
const port = "3001";

module.exports = {
  IP: ip,
  PORT: port,
  PROTOCOL: protocol,
  URL: protocol + "://" + ip + ":" + port,
};
