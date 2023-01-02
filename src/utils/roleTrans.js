const roleTrans = (roleName, fullTrans) => {
    switch (roleName) {
        case 'CREATE_CARD':
            if(!fullTrans){return 'P3'}else{return 'P3: Tạo mới công việc'};
        case 'MANAGE_MEMBER':
            if(!fullTrans){return 'P2'}else{return 'P2: Quản lý thành viên'};
        case 'UPDATE_CARD':
            if(!fullTrans){return 'P4'}else{return 'P4: Cập nhật thông tin chung công việc'};
        case 'DELETE_CARD':
            if(!fullTrans){return 'P7'}else{return 'P7: Hủy bỏ công việc'};
        case 'MANAGE_ROLE':
            if(!fullTrans){return 'P8'}else{return 'P8: Quản lý vai trò'};
        case 'UPDATE_PROJECT':
            if(!fullTrans){return 'P1'}else{return 'P1: Cập nhật dự án'};
        case 'UPDATE_CARD_STATUS':
            if(!fullTrans){return 'P5'}else{return 'P5: Cập nhật trạng thái công việc'};
        case 'UPDATE_ASSIGNEE':
            if(!fullTrans){return 'P6'}else{return 'P6: Cập nhật người thực hiện công việc'};
        default:
            break;
    }
}

export {roleTrans}