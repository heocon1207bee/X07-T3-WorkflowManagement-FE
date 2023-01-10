import React from 'react';

const Comment = () => {
    return (
        <div className='comment'>
            <div className='author-comment-avatar comment-item'>
                <img src={'https://t3.ftcdn.net/jpg/01/65/63/94/360_F_165639425_kRh61s497pV7IOPAjwjme1btB8ICkV0L.jpg'}/>
            </div>
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