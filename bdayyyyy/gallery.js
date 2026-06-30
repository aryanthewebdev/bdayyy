let currentPageIndex = 0;
const pages = document.querySelectorAll('.page');
const maxPages = pages.length;

// Pre-initialize and map stack heights safely
function initBook() {
    pages.forEach((page, index) => {
        if (index === 0) {
            page.classList.add('active');
        } else {
            page.classList.remove('active', 'flipped');
        }
    });
}

function nextPage() {
    if (currentPageIndex < maxPages - 1) {
        const currentPage = document.getElementById(`p${currentPageIndex}`);
        
        // Flip the current active page forward
        currentPage.classList.add('flipped');
        
        // Set up references tracking indices forward
        currentPageIndex++;
        const nextPageElement = document.getElementById(`p${currentPageIndex}`);
        
        // Swap visibility focus layers
        nextPageElement.classList.add('active');
        setTimeout(() => {
            if(currentPageIndex - 1 >= 0) {
                 document.getElementById(`p${currentPageIndex - 1}`).classList.remove('active');
            }
        }, 300);
    }
}

function prevPage() {
    if (currentPageIndex > 0) {
        const currentPage = document.getElementById(`p${currentPageIndex}`);
        currentPage.classList.remove('active');
        
        currentPageIndex--;
        const prevPageElement = document.getElementById(`p${currentPageIndex}`);
        
        // Flip page back to view state
        prevPageElement.classList.add('active');
        prevPageElement.classList.remove('flipped');
    }
}

// Fire Setup Initialize
initBook();