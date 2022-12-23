import React from 'react';

const Comment = () => {
    return (
        <div className='comment'>
            <div className='author-comment-avatar comment-item'><div>Avt</div></div>
            <div className='author-comment-name comment-item'>
                <p>Tên Người Bình Luận</p>
                <small>dd/mm/yy hh:mm</small>
            </div>
            <div className='author-comment comment-item'>
                Bình luận của người bình luận
            </div>
        </div>
    );
};

export default Comment;