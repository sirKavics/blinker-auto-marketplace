function openMenu() {
    document.body.classList += " menu--open"
    }
    
function closeMenu () {
        document.body.classList.remove('menu--open')
    }

    function showUserPosts(id) {
        localStorage.setItem("id", id);
        window.location.href= `${window.location.origin}/findyourcar.html`
    }