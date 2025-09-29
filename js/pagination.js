// Pagination functionality for blog listing page
document.addEventListener('DOMContentLoaded', function() {
  // Blog listing page pagination
  const blogPagination = document.querySelector('.blog-section .pagination');
  if (blogPagination) {
    const paginationNumbersContainer = blogPagination.querySelector('.pagination-numbers');
    const prevButton = blogPagination.querySelector('.pagination-button.prev');
    const nextButton = blogPagination.querySelector('.pagination-button.next');
    const itemsPerPage = 10; // Number of blog posts per page
    let currentPage = 1;

    // Get all blog items
    const blogItems = document.querySelectorAll('.blog-collection-list .w-dyn-item');
    const totalPages = Math.ceil(blogItems.length / itemsPerPage);

    // Generate pagination numbers dynamically based on total pages
    function generatePaginationNumbers() {
      // Clear existing pagination numbers
      paginationNumbersContainer.innerHTML = '';
      
      // Create pagination numbers based on total pages
      for (let i = 1; i <= totalPages; i++) {
        const pageLink = document.createElement('a');
        pageLink.href = '#';
        pageLink.className = 'pagination-number';
        if (i === currentPage) {
          pageLink.classList.add('active');
        }
        pageLink.textContent = i;
        
        // Add click event to each pagination number
        pageLink.addEventListener('click', (e) => {
          e.preventDefault();
          currentPage = i;
          updatePaginationNumbers();
          showPage(currentPage);
        });
        
        paginationNumbersContainer.appendChild(pageLink);
      }
    }

    // Update pagination numbers
    function updatePaginationNumbers() {
      const paginationNumbers = paginationNumbersContainer.querySelectorAll('.pagination-number');
      paginationNumbers.forEach(number => {
        const pageNum = parseInt(number.textContent);
        if (pageNum === currentPage) {
          number.classList.add('active');
        } else {
          number.classList.remove('active');
        }
      });
    }

    // Show/hide blog items based on current page
    function showPage(page) {
      const start = (page - 1) * itemsPerPage;
      const end = start + itemsPerPage;

      blogItems.forEach((item, index) => {
        if (index >= start && index < end) {
          item.style.display = '';
        } else {
          item.style.display = 'none';
        }
      });

      // Update buttons state
      prevButton.style.opacity = page === 1 ? '0.5' : '1';
      prevButton.style.pointerEvents = page === 1 ? 'none' : 'auto';
      nextButton.style.opacity = page === totalPages ? '0.5' : '1';
      nextButton.style.pointerEvents = page === totalPages ? 'none' : 'auto';

      // Scroll to top of blog section
      const bannerSection = document.querySelector('.banner-section');
      bannerSection.scrollIntoView({ behavior: 'smooth' });
    }

    // Add click events to prev/next buttons
    prevButton.addEventListener('click', (e) => {
      e.preventDefault();
      if (currentPage > 1) {
        currentPage--;
        updatePaginationNumbers();
        showPage(currentPage);
      }
    });

    nextButton.addEventListener('click', (e) => {
      e.preventDefault();
      if (currentPage < totalPages) {
        currentPage++;
        updatePaginationNumbers();
        showPage(currentPage);
      }
    });

    // Generate pagination numbers and initialize first page
    generatePaginationNumbers();
    showPage(1);
  }

  // Blog detail page pagination
  const detailPagination = document.querySelector('.blog-details-section .pagination');
  if (detailPagination) {
    const prevButton = detailPagination.querySelector('.pagination-button.prev');
    const nextButton = detailPagination.querySelector('.pagination-button.next');

    // Get all blog posts URLs (this should be dynamically populated based on your CMS)
    const blogPosts = [
      { title: 'Previous Post Title', url: '#' },
      { title: 'Current Post', url: window.location.href },
      { title: 'Next Post Title', url: '#' }
    ];

    // Find current post index
    const currentPostIndex = blogPosts.findIndex(post => post.url === window.location.href);

    // Update navigation buttons
    if (currentPostIndex > 0) {
      prevButton.href = blogPosts[currentPostIndex - 1].url;
    } else {
      prevButton.style.opacity = '0.5';
      prevButton.style.pointerEvents = 'none';
    }

    if (currentPostIndex < blogPosts.length - 1) {
      nextButton.href = blogPosts[currentPostIndex + 1].url;
    } else {
      nextButton.style.opacity = '0.5';
      nextButton.style.pointerEvents = 'none';
    }
  }
});