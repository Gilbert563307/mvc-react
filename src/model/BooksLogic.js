const BooksLogic = {

    async createBook(book){
        const url = "http://localhost:8000/api/books/create";
        try {
            const httpOptions = {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    // 'Content-Type': 'application/x-www-form-urlencoded',
                  },
                body: JSON.stringify(book)
            }
            const response = await fetch(url, httpOptions);
            if (response.ok) {
                const data = await response.json();
                return data.created;
            } else {
                throw new Error(response.status.toString());
            }
        } catch (error) {
            console.log(`Failed set book to finished  ${error}`);
        }
    },


    async fetchData(){
        const url = "http://localhost:8000/api/books";
        try {
            const response = await fetch(url);

            if (response.ok) {
                const data = await response.json();
                return data;
            } else {
                throw new Error(response.status.toString());
            }
        } catch (error) {
            console.log(`Failed fetching users ${error}`);
        }
    },

    async updateBook(bookId){
        const url = "http://localhost:8000/api/books/readbook";
        try {
            const httpOptions = {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    // 'Content-Type': 'application/x-www-form-urlencoded',
                  },
                body: JSON.stringify({
                    id: bookId,
                    read_at: true,
                })
            }
            const response = await fetch(url, httpOptions);
            if (response.ok) {
                const data = await response.json();
                return data.updated;
            } else {
                throw new Error(response.status.toString());
            }
        } catch (error) {
            console.log(`Failed set book to finished  ${error}`);
        }
    },

    
}
export default BooksLogic;