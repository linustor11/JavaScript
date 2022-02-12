class GitHub {
   constructor() {
      this.client_id = '';	// enter github client id here
      this.client_secret = '';	// enter secret key generated here
      this.repos_count = 5;   // We want only few repositories to display
      this.repos_sort = 'created: asc';
   }
   async getUser(user) {
      const profileResponse = await fetch(`https://api.github.com/users/${user}?client_id=${this.client_id}&${this.client_secret}`);

      const repoResponse = await fetch(`https://api.github.com/users/${user}/repos?per_page=${this.repos_count}&sort=${this.repos_sort}&client_id=${this.client_id}&${this.client_secret}`);

      const profile = await profileResponse.json();   //if profileData then return likewise
      const repos = await repoResponse.json();

      return {    // return objects
         // profile : profileData
         // profile: profile
         profile,
         repos
      }
   }
}
