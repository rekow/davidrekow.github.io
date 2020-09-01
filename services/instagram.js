import axios from 'axios';
import storage from '~/services/storage';

const TOKEN = "IGQVJXcU9MWWtXRjV4enloenJRSldLZAEVfcmMyQnlHX0FJenpuTjh6RzBhQTVRYTJXcTV4X3pjZA3R1SzZAfZAjBTNGlxWHBiN3BEV2dQbzduOE9IMkdSdFoxVzhzRjlaajhDdzFFS05JNHhDMU1aLTZAOVwZDZD";
const API = 'https://graph.instagram.com';
const IG = 'ig';


/**
 * Internal datastructure to represent Media returned from the insta API.
 * @private @final
 */
class InstagramMedia {
  /**
  * @constructor
  * @param {object} igData A Media response object.
  */
  constructor(igData) {
    this.id = igData.id;
    this.caption = igData.caption;
    this.permalink = igData.permalink;
    this.timestamp = igData.timestamp;
    this.type = igData.media_type || igData.type;
    this.url = igData.thumbnail_url || igData.media_url || igData.url;

    if (igData.children && igData.children.data) {
      this.children = igData.children.data.map(child => new InstagramMedia(child).put().id);
    } else {
      this.children = igData.children;
    }
  }

  put() {
    storage.put(`${IG}:${this.id}`, this);
    return this;
  }

  static get(id) {
    const media = storage.get(`${IG}:${id}`);
    if (media) {
      return new InstagramMedia(media);
    }
  }
}

export default {
  /**
   * Fetches my personal insta feed from the Media Edge API (latest 100 items) and caches them in localStorage.
   * Should only ever be called on first load on a given machine.
   * @async
   */
  async bootstrapFeed(limit = 100) {
    let feed = [];

    let url = `${API}/me/media?fields=id,caption,timestamp,media_type,media_url,permalink,thumbnail_url,children{media_url}&access_token=${TOKEN}`;
    let count = Math.ceil(limit/25);

    while (count--) {
      let { data } = await axios.get(url);
      url = data.paging.next;
      feed.push(...data.data);
    }

    feed = feed.map(item => this.toMedia(item).put().id);

    storage.put(`${IG}:feed`, feed);
    return feed;
  },

  /**
   * Gets any locally-cached insta feed information and if found, populates it with media. If none exists, falls back
   * to bootstrap from the API.
   * @async
   */
  async getFeed() {
    const storedFeed = storage.get(`${IG}:feed`);

    if (storedFeed) {
      return storedFeed;
    }

    return this.bootstrapFeed();
  },

  /**
   * Takes a passed insta Media ID and tries to load from localStorage. If it's not there, will fetch from the API.
   * @async
   * @param {string|number} mediaId
   */
  async getMedia(mediaId) {
    let media = InstagramMedia.get(mediaId);

    if (media) {
      return media;
    }

    const { data } = await axios.get(`${API}/${mediaId}?fields=id,caption,timestamp,media_type,media_url,permalink,thumbnail_url,children{media_url}&access_token=${TOKEN}`);
    return this.toMedia(data).put();
  },

  /**
   * Takes passed data (assumed to be a Media object returned from the insta API), and instantiates an InstagramMedia.
   * @param {object} igData
   * @return {InstagramMedia}
   */
  toMedia(igData) {
    if (igData instanceof InstagramMedia) {
      return igData;
    }

    return new InstagramMedia(igData);
  }
}
