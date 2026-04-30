function InfoPage() {
  const user = JSON.parse(localStorage.getItem('user'));

  return (
    <div>
      <h1>Info</h1>
      <p><strong>Username:</strong> {user?.username}</p>
      <p><strong>Email:</strong> {user?.email}</p>
      <p><strong>ID:</strong> {user?.id}</p>
    </div>
  );
}

export default InfoPage;
