
        // Loader Animation
        const spaceshipLoader = document.getElementById('spaceshipLoader');
        const portfolioContent = document.getElementById('portfolioContent');
        const progressBar = document.getElementById('progressBar');
        const loadingMessage = document.getElementById('loadingMessage');
        const starsBg = document.getElementById('starsBg');
        
        const messages = [
            "Launching into the digital cosmos...",
            "Warp speed engaged...",
            "Navigating through the web galaxy...",
            "Fueling up with JavaScript...",
            "Avoiding asteroid bugs...",
            "Entering the portfolio dimension..."
        ];
        
        // Create stars for background
        for (let i = 0; i < 100; i++) {
            const star = document.createElement('div');
            star.classList.add('star');
            star.style.width = `${Math.random() * 3 + 1}px`;
            star.style.height = star.style.width;
            star.style.left = `${Math.random() * 100}%`;
            star.style.top = `${Math.random() * 100}%`;
            star.style.setProperty('--duration', `${Math.random() * 3 + 2}s`);
            starsBg.appendChild(star);
        }
        
        // Simulate loading progress
        let progress = 0;
        const loadingInterval = setInterval(() => {
            progress += Math.random() * 10;
            if (progress > 100) progress = 100;
            progressBar.style.width = `${progress}%`;
            
            // Change message every 20% progress
            if (progress % 20 < 5) {
                loadingMessage.textContent = messages[Math.floor(Math.random() * messages.length)];
            }
            
            if (progress >= 100) {
                clearInterval(loadingInterval);
                setTimeout(() => {
                    spaceshipLoader.style.opacity = '0';
                    spaceshipLoader.style.transition = 'opacity 0.5s ease-out';
                    setTimeout(() => {
                        spaceshipLoader.style.display = 'none';
                        portfolioContent.style.display = 'block';
                        initCustomCursor(); // Initialize custom cursor after content loads
                    }, 500);
                }, 500);
            }
        }, 200);
        
        // Custom cursor effect
        function initCustomCursor() {
            const cursor = document.createElement('div');
            cursor.classList.add('custom-cursor');
            document.body.appendChild(cursor);

            const cursorOuter = document.createElement('div');
            cursorOuter.classList.add('cursor-outer');
            document.body.appendChild(cursorOuter);

            // Create trail elements
            const trailElements = [];
            for (let i = 0; i < 5; i++) {
                const trail = document.createElement('div');
                trail.classList.add('cursor-trail');
                document.body.appendChild(trail);
                trailElements.push(trail);
            }

            let mouseX = 0, mouseY = 0;
            let posX = 0, posY = 0;
            let trailPosX = Array(5).fill(0);
            let trailPosY = Array(5).fill(0);
            const speed = 0.15;
            const trailSpeed = 0.1;

            document.addEventListener('mousemove', (e) => {
                mouseX = e.clientX;
                mouseY = e.clientY;
            });

            function animateCursor() {
                // Main cursor
                posX += (mouseX - posX) * speed;
                posY += (mouseY - posY) * speed;
                
                cursor.style.left = `${posX}px`;
                cursor.style.top = `${posY}px`;
                cursorOuter.style.left = `${posX}px`;
                cursorOuter.style.top = `${posY}px`;
                
                // Trail effect
                trailPosX[0] += (mouseX - trailPosX[0]) * trailSpeed;
                trailPosY[0] += (mouseY - trailPosY[0]) * trailSpeed;
                
                for (let i = 1; i < trailElements.length; i++) {
                    trailPosX[i] += (trailPosX[i-1] - trailPosX[i]) * trailSpeed;
                    trailPosY[i] += (trailPosY[i-1] - trailPosY[i]) * trailSpeed;
                    
                    trailElements[i].style.left = `${trailPosX[i]}px`;
                    trailElements[i].style.top = `${trailPosY[i]}px`;
                    trailElements[i].style.opacity = (0.6 - (i * 0.1)).toString();
                }
                
                // First trail element follows more closely
                trailElements[0].style.left = `${trailPosX[0]}px`;
                trailElements[0].style.top = `${trailPosY[0]}px`;
                
                requestAnimationFrame(animateCursor);
            }

            animateCursor();

            // Cursor effects on interactive elements
            const interactiveElements = document.querySelectorAll('a, button, .card, .social-icon, .email-link');
            interactiveElements.forEach(el => {
                el.addEventListener('mouseenter', () => {
                    cursor.style.transform = 'translate(-50%, -50%) scale(1.5)';
                    cursorOuter.style.transform = 'translate(-50%, -50%) scale(1.2)';
                });
                el.addEventListener('mouseleave', () => {
                    cursor.style.transform = 'translate(-50%, -50%) scale(1)';
                    cursorOuter.style.transform = 'translate(-50%, -50%) scale(1)';
                });
            });
        }

        // Set current year in footer
        document.getElementById('year').textContent = new Date().getFullYear();
        
        // Add animation to social icons on page load
        document.addEventListener('DOMContentLoaded', () => {
            const socialIcons = document.querySelectorAll('.social-icon');
            socialIcons.forEach((icon, index) => {
                icon.style.transform = 'translateY(20px)';
                icon.style.opacity = '0';
                
                setTimeout(() => {
                    icon.style.transition = 'all 0.5s cubic-bezier(0.68, -0.55, 0.265, 1.55)';
                    icon.style.transform = 'translateY(0)';
                    icon.style.opacity = '1';
                }, 100 * index);
            });
        });
