function InfoPage() {
  const user = JSON.parse(localStorage.getItem('user'));

  return (
    <div className="page">
      <h1>Info</h1>
      <div className="info-card">
        <div className="info-row"><strong>Username</strong><span>{user?.username}</span></div>
        <div className="info-row"><strong>Email</strong><span>{user?.email}</span></div>
        {user?.phone && <div className="info-row"><strong>Phone</strong><span>{user.phone}</span></div>}
      </div>
    </div>
  );
}

export default InfoPage;
