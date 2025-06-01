document.addEventListener('DOMContentLoaded', () => {
    const navLinks = document.querySelectorAll('nav ul li a');
    const contentSections = document.querySelectorAll('main section');

    function showSection(targetId) {
        // Hide all content sections
        contentSections.forEach(section => {
            section.classList.remove('active-content');
            // As a fallback or alternative, could also do: section.style.display = 'none';
        });

        // Remove 'active' class from all nav links
        navLinks.forEach(link => {
            link.classList.remove('active');
        });

        // Show the target section
        const targetSection = document.getElementById(targetId);
        if (targetSection) {
            targetSection.classList.add('active-content');
            // Fallback: targetSection.style.display = 'block';
        }

        // Add 'active' class to the clicked nav link
        // We find the link whose href matches '#' + targetId
        const activeLink = document.querySelector(`nav ul li a[href="#${targetId}"]`);
        if (activeLink) {
            activeLink.classList.add('active');
        }
    }

    // Attach event listeners to navigation links
    navLinks.forEach(link => {
        link.addEventListener('click', (event) => {
            event.preventDefault(); // Prevent default anchor behavior
            const targetId = link.getAttribute('href').substring(1); // Get ID from href (remove #)
            showSection(targetId);
        });
    });

    // Initial state: Show the first section by default
    if (navLinks.length > 0) {
        const firstSectionId = navLinks[0].getAttribute('href').substring(1);
        if (firstSectionId) {
            showSection(firstSectionId);
        } else if (contentSections.length > 0) {
            // Fallback if first link has no href, show first section directly
            // This assumes sections have IDs that could be guessed or are in order.
            // For robustness, ensuring navLinks[0] href is valid is better.
            contentSections[0].classList.add('active-content');
            if(navLinks[0]) navLinks[0].classList.add('active'); // Also activate the first link
        }
    }
});
