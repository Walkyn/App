function contentLoader() {
    return {
        isSidebarOpen: true,
        content: '',

        loadContent(page) {
            fetch(page)
                .then(response => response.text())
                .then(html => {
                    this.content = html;
                })
                .catch(error => {
                    console.error('Error loading content:', error);
                });
        }
    };
}