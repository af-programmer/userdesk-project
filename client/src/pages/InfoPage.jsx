function InfoPage() {
  const user = JSON.parse(localStorage.getItem('user'));

  return (
    <div className="page">
      <h1>Info</h1>
      <div className="info-card">
        <div className="info-row"><strong>Username</strong><span>{user?.username}</span></div>
        <div className="info-row"><strong>Email</strong><span>{user?.email}</span></div>
        <div className="info-row"><strong>ID</strong><span>{user?.id}</span></div>
      </div>
    </div>
  );
}

export default InfoPage;
