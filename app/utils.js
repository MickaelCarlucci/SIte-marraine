// eslint-disable-next-line no-unused-vars
function redirectToHome() {
  // Vérifier si l'ancre existe sur la page actuelle
  if (document.getElementById('accueil')) {
    // Rediriger vers l'ancre si elle existe
    window.location.href = '#accueil';
  } else {
    // Rediriger vers la route / si l'ancre n'existe pas (sur une autre page)
    window.location.href = '/';
  }
}
