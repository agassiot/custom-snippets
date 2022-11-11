const btnL = document.querySelector('#buttonInstall');

// Logic for installing the PWA
window.addEventListener('beforeinstallprompt', (e) => {
    window.deferred = e;
    btnL.classList.toggle('hidden',false);
});

btnL.addEventListener('click', async () => {
    var prompt = window.deferred;
    if(!prompt) return; 

    prompt.prompt();
    window.deferred = null;
    btnL.classList.toggle('hidden',true);
});

window.addEventListener('appinstalled', (e) => {
    window.deferred = null;
    console.log('success');
});
