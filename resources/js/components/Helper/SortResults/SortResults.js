const sortResults = (customSort, customCategories) => {
    let sort_results = customSort;
    if (customCategories === "name_asc") {
        sort_results.sort((a, b) => {
            if (a.name > b.name) return 1;
            return -1;
        });
    }

    if (customCategories === "name_desc") {
        sort_results.sort((a, b) => {
            if (a.name < b.name) return 1;
            return -1;
        });
    }

    if (customCategories === "price_asc") {
        sort_results.sort((a, b) => {
            if (a.price > b.price) return 1;
            return -1;
        });
    }

    if (customCategories === "price_desc") {
        sort_results.sort((a, b) => {
            if (a.price < b.price) return 1;
            return -1;
        });
    }

    if (customCategories === "newest_date") {
        sort_results.sort((a, b) => {
            if (a.created_at < b.created_at) return 1;
            return -1;
        });
    }
    if (customCategories === "oldest_date") {
        sort_results.sort((a, b) => {
            if (a.created_at > b.created_at) return 1;
            return -1;
        });
    }

    return sort_results;
};

export default sortResults;
