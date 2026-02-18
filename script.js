// script.js
document.addEventListener('DOMContentLoaded', () => {
    
    // Time Widget Update
    function updateTime() {
        const timeElement = document.getElementById('local-time');
        const now = new Date();
        
        // Format to WIB (UTC+7)
        const options = { 
            hour: '2-digit', 
            minute: '2-digit', 
            timeZone: 'Asia/Jakarta',
            hour12: false
        };
        
        const timeString = new Intl.DateTimeFormat('en-GB', options).format(now);
        timeElement.textContent = `${timeString.replace(':', '.')} WIB`;
    }

    // Initial call
    updateTime();
    
    // Update every minute
    setInterval(updateTime, 60000);

    // Simple hover interaction for cards (optional 3D tilt effect if desired)
    // For now, keeping it clean with CSS hover states.

    // Scroll Reveal Animation with IntersectionObserver
    const revealElements = document.querySelectorAll('.reveal-on-scroll');
    const revealOptions = {
        threshold: 0.15,
        rootMargin: "0px 0px -50px 0px"
    };

    const revealObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                observer.unobserve(entry.target); // Animate only once
            }
        });
    }, revealOptions);

    revealElements.forEach(el => {
        revealObserver.observe(el);
    });

    // Sticky Header Scroll Effect
    const topbar = document.querySelector('.topbar');
    let lastScrollY = window.scrollY;
    let ticking = false;

    window.addEventListener('scroll', () => {
        if (!ticking) {
            window.requestAnimationFrame(() => {
                if (window.scrollY > 20) {
                    topbar.classList.add('scrolled');
                } else {
                    topbar.classList.remove('scrolled');
                }
                lastScrollY = window.scrollY;
                ticking = false;
            });
            ticking = true;
        }
    });

    // Theme Toggle
    const modeToggle = document.getElementById('mode-toggle');
    const body = document.body;
    
    if(modeToggle) {
        modeToggle.addEventListener('click', () => {
            body.classList.toggle('light-mode');
            if(body.classList.contains('light-mode')) {
                modeToggle.textContent = 'mode: light';
            } else {
                modeToggle.textContent = 'mode: dark';
            }
        });
    }

    // Status Indicator
    const statusDot = document.querySelector('.status-dot');
    if (statusDot) {
        // Toggle status color for demo
        statusDot.addEventListener('click', () => {
            const currentBg = getComputedStyle(statusDot).backgroundColor;
            // Toggle between purple (accent) and green (online)
            if (currentBg.includes('139, 92, 246')) { // Purple
                statusDot.style.backgroundColor = '#22c55e'; // Green
                statusDot.style.boxShadow = '0 0 10px rgba(34, 197, 94, 0.3)';
            } else {
                statusDot.style.backgroundColor = ''; // Revert to CSS default (purple)
                statusDot.style.boxShadow = '';
            }
        });
    }

    // YouTube Player API
    var tag = document.createElement('script');
    tag.src = "https://www.youtube.com/iframe_api";
    var firstScriptTag = document.getElementsByTagName('script')[0];
    firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);

    var player;
    window.onYouTubeIframeAPIReady = function() {
        player = new YT.Player('youtube-player', {
            height: '0',
            width: '0',
            videoId: '5TS7-N7k8f0',
            playerVars: {
                'playsinline': 1,
                'controls': 0,
                'loop': 1,
                'playlist': '5TS7-N7k8f0',
                'origin': window.location.origin // Security best practice
            },
            events: {
                'onReady': onPlayerReady
            }
        });
    };

    function onPlayerReady(event) {
        // Player is ready
        console.log("Player Ready");
    }

    const playBtn = document.getElementById('play-btn');
    const playText = document.getElementById('play-text');
    let isPlaying = false;

    if(playBtn){
        playBtn.addEventListener('click', function() {
            // Check if player is initialized and has playVideo method
            if(!player || typeof player.playVideo !== 'function') {
                console.log("Player not ready yet");
                return;
            }
            
            if(isPlaying) {
                player.pauseVideo();
                playText.textContent = 'play';
            } else {
                player.playVideo();
                playText.textContent = 'pause';
            }
            isPlaying = !isPlaying;
        });
    }
});
