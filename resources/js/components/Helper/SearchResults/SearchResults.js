const searchResults = (search, keyword) => {
    let searchResults = search
        .filter(searchDetails => {
            // Filter results by doing case insensitive match on name 
            return searchDetails.name.toLowerCase().includes(keyword.toLowerCase());
        })
        .sort((a, b) => {
            // Sort results by matching name with keyword position in name
            if(a.name.toLowerCase().indexOf(keyword.toLowerCase()) > b.name.toLowerCase().indexOf(keyword.toLowerCase())) {
                return 1;
            } else if (a.name.toLowerCase().indexOf(keyword.toLowerCase()) < b.name.toLowerCase().indexOf(keyword.toLowerCase())) {
                return -1;
            } else {
                if(a.name > b.name)
                    return 1;
                else
                    return -1;
            }
        });
    
    return searchResults;
}