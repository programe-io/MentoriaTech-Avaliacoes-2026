* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
  font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
}

body {
  background-color: #f0f2f5;
  color: #1c1e21;
  padding: 20px;
}

.feed-container {
  max-width: 600px;
  margin: 0 auto;
  display: flex;
  flex-direction: column;
  gap: 20px;
}

.card {
  background: #ffffff;
  border-radius: 8px;
  padding: 16px;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
}

/* Criar Post */
.create-post h3 {
  font-size: 1rem;
  margin-bottom: 10px;
  color: #65676b;
}

.create-post textarea {
  width: 100%;
  height: 80px;
  border: 1px solid #dddfe2;
  border-radius: 6px;
  padding: 10px;
  resize: none;
  outline: none;
  font-size: 0.95rem;
}

.create-post button {
  margin-top: 10px;
  background-color: #1877f2;
  color: #fff;
  border: none;
  padding: 8px 16px;
  border-radius: 6px;
  font-weight: bold;
  cursor: pointer;
  float: right;
}

.create-post button:hover {
  background-color: #166fe5;
}

/* Estrutura do Post */
.post-header {
  display: flex;
  align-items: center;
  gap: 12px;
  margin-bottom: 12px;
}

.avatar {
  border-radius: 50%;
}

.time {
  display: block;
  font-size: 0.8rem;
  color: #65676b;
}

.post-content {
  font-size: 0.95rem;
  line-height: 1.4;
  margin-bottom: 15px;
}

/* Ações */
.post-actions {
  display: flex;
  gap: 10px;
  border-top: 1px solid #e4e6eb;
  padding-top: 10px;
}

.post-actions button {
  background: transparent;
  border: none;
  padding: 6px 12px;
  border-radius: 4px;
  cursor: pointer;
  color: #65676b;
  font-weight: 600;
}

.post-actions button:hover {
  background-color: #f2f2f2;
}

.post-actions button.liked {
  color: #e41e3f;
}

/* Comentários */
.comments-section {
  margin-top: 15px;
  border-top: 1px solid #f0f2f5;
  padding-top: 10px;
}

.comments-list {
  display: flex;
  flex-direction: column;
  gap: 8px;
  margin-bottom: 10px;
}

.comment-item {
  background: #f0f2f5;
  padding: 8px 12px;
  border-radius: 12px;
  font-size: 0.85rem;
}

.comment-input-box {
  display: flex;
  gap: 8px;
}

.comment-input {
  flex: 1;
  border: 1px solid #dddfe2;
  border-radius: 18px;
  padding: 6px 12px;
  outline: none;
}

.btn-comment {
  background: #1877f2;
  color: #fff;
  border: none;
  padding: 6px 12px;
  border-radius: 18px;
  cursor: pointer;
  font-size: 0.85rem;
}