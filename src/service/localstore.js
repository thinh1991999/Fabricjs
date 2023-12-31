class StoreService {
  IMAGES = "IMAGES";
  VIDEOS = "VIDEOS";
  TEMPLATES="TEMPLATES"
}

class BaseStoreService {
  key;
  constructor(_key) {
    this.key = _key;
  }
  get() {
    return JSON.parse(localStorage.getItem(this.key)) || [];
  }
  set(values) {
    console.log(values);
    localStorage.setItem(this.key, JSON.stringify(values)) || [];
  }
  remove() {
    localStorage.removeItem(this.key);
  }
}

class LocalStorageService extends StoreService {
  imagesService = new BaseStoreService(this.IMAGES);
  videoService = new BaseStoreService(this.VIDEOS);
  templateService = new BaseStoreService(this.TEMPLATES);
}

const localStorageService = new LocalStorageService();

export default localStorageService;
