$('#logout').on('click', async () => {
    await $.post('/api/users/logout')
      .then(() => {
        window.location.replace("/");
        // If there's an error, log the error
      })
      .catch(err => {
        console.log(err);
    });
})