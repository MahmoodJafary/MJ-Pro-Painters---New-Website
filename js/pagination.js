// Pagination functionality for multiple pages
document.addEventListener('DOMContentLoaded', function() {
  
  // Generic pagination function
  function initializePagination(sectionSelector, itemSelector, itemsPerPage = 9) {
    const paginationSection = document.querySelector(sectionSelector);
    if (!paginationSection) return;
    
    const pagination = paginationSection.querySelector('.pagination');
    if (!pagination) return;
    
    const paginationNumbersContainer = pagination.querySelector('.pagination-numbers');
    const prevButton = pagination.querySelector('.pagination-button.prev');
    const nextButton = pagination.querySelector('.pagination-button.next');
    let currentPage = 1;

    // Get all items
    const items = document.querySelectorAll(itemSelector);
    const totalPages = Math.ceil(items.length / itemsPerPage);

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

    // Show/hide items based on current page
    function showPage(page) {
      const start = (page - 1) * itemsPerPage;
      const end = start + itemsPerPage;

      items.forEach((item, index) => {
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

      // Scroll to top of section
      const bannerSection = document.querySelector('.banner-section');
      if (bannerSection) {
        bannerSection.scrollIntoView({ behavior: 'smooth' });
      }
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

  // Initialize pagination for different pages
  // Blog listing page
  initializePagination('.blog-section', '.blog-collection-list .w-dyn-item', 9);
  
  // Reviews page
  initializePagination('.review-section-01', '.review-wrapper .review-card', 6);
  
  // Recent projects page
  initializePagination('.service-list-wrapper', '.service-collection-list-2 .w-dyn-item', 6);
  
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