import axios from 'axios';
import storage from '~/services/storage'

const GH = 'gh';
const API = 'https://api.github.com';

/**
 * Internal datastructure to represent repo results returned from the Github API.
 * @private @final
 */
class GithubRepo {
  static repos = {
    byId: {},
    byName: {}
  };

  constructor(ghData) {
    this.id = ghData.id;
    this.name = ghData.name;
    this.description = ghData.description;
    this.language = ghData.language;
    this.permalink = ghData.html_url || ghData.permalink;
    this.size = ghData.size;
    this.fork = ghData.fork;
    this.forks = ghData.forks_count || ghData.forks;
    this.stars = ghData.stargazers_count || ghData.stars || 0;
    this.watchers = ghData.watchers_count || ghData.watchers;

    if (ghData.files) {
      this.files = [...ghData.files];
    }

    GithubRepo.repos.byId[this.id] = this.name;
    GithubRepo.repos.byName[this.name] = this.id;
  }

  put() {
    storage.put(`${GH}:repo:${this.id}`, this);
    return this;
  }

  static get(id) {
    const repo = storage.get(`${GH}:repo:${id}`);
    if (repo) {
      return new GithubRepo(repo);
    }
  }
}

/**
 * Internal datastructure to represent content in a gh repo.
 * @private @final
 */
class GithubFile {
  constructor(ghFile, repoId) {
    this.name = ghFile.name;
    this.path = ghFile.path;
    this.size = ghFile.size;
    this.type = ghFile.type;
    this.permalink = ghFile.html_url;
    this.repo = repoId;
    if (ghFile.files) {
      this.files = ghFile.files;
    }
  }

  put() {
    storage.put(`${GH}:repo:${this.repo}/${this.path}`, this);
    return this;
  }

  static get(repoId, path) {
    const file = storage.get(`${GH}:repo:${repoId}/${path}`);
    if (file) {
      return new GithubFile(file);
    }
  }
}

export default {
  /**
   * Fetches my personal gh public repos and caches them in localStorage.
   * Should only ever be called on first load on a given machine.
   * @async
   */
  async bootstrapRepos() {
    let { data } = await axios.get(`${API}/users/davidrekow/repos?sort=updated`);

    const repos = data.map(item => {
      return this.toRepo(item).put().id;
    });

    storage.put(`${GH}:repos`, repos);
    return repos;
  },

  /**
  * Gets any locally-cached gh repo information and if none is found, bootstraps it.
  * @async
  */
  async getRepos() {
    const storedRepos = storage.get(`${GH}:repos`);

    if (storedRepos) {
      return storedRepos;
    }

    return this.bootstrapRepos();
  },

  /**
   * Gets a repo by passed ID, checking locally first. If none is found will fetch
   * the repo from the API.
   * before returning.
   * @async
   * @param {string} repoId
   */
  async getRepo(repoId) {
    let repo = GithubRepo.get(repoId);

    if (repo && repo.files) {
      return repo;
    }

    if (!repo) {
      const { data } = await axios.get(`${API}/repositories/${repoId}`);
      repo = this.toRepo(repo.name, data);
    }

    if (!repo.files) {
      repo.files = await this.getRepoContents(repo.id);
    }

    return repo.put();
  },

  /**
   * Gets a repo's files by passed ID. If a path is optionally provided, will return the files
   * at that path, otherwise will return the root.
   * @async
   * @param {string} repoId
   * @param {?string} path
   */
  async getRepoContents(repoId, path="") {
    const storedContents = GithubFile.get(repoId, path);

    if (storedContents && (!storedContents.files || storedContents.files.length)) {
      return storedContents;
    }

    const repoName = GithubRepo.repos.byId[repoId];
    const { data } = await axios.get(`${API}/repos/davidrekow/${repoName}/contents/${path}`);

    return data.map(content => {
      if (content.type === 'dir') {
        content.files = [];
      }
      return new GithubFile(content, repoId).put();
    });
  },

  /**
   * Takes passed gh API data and returns a GithubRepo instance.
   * @param {string} repoName
   * @param {object} ghData
   * @return {GithubRepo}
   */
  toRepo(name, ghData) {
    if (ghData instanceof GithubRepo) {
      return ghData;
    }

    return new GithubRepo(name, ghData);
  }
}
