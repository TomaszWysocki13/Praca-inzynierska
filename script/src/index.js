import axios from "axios";

class Tracker {
  constructor(uri, sid) {
    this.uri = uri;
    this.sid = sid;
  }

  event = async (type, uri) => {
    try {
      await axios.get(`${this.uri}/track/${this.sid}?type=${type}&uri=${uri}`);
    } catch (e) {
      console.log(`Event sending error: ${e.message}`);
    }
  };
}

export default Tracker;
