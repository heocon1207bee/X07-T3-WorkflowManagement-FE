import {
    CREATE_CARD,
    MANAGE_MEMBER,
    UPDATE_CARD,
    DELETE_CARD,
    MANAGE_ROLE,
    UPDATE_PROJECT,
    UPDATE_CARD_STATUS,
    UPDATE_ASSIGNEE,
    CREATE_CARD_ID,
    MANAGE_MEMBER_ID,
    UPDATE_CARD_ID,
    DELETE_CARD_ID,
    MANAGE_ROLE_ID,
    UPDATE_PROJECT_ID,
    UPDATE_CARD_STATUS_ID,
    UPDATE_ASSIGNEE_ID,
} from '../configs/CAPABILITIES';
const roleTrans = (roleName, fullTrans) => {
    switch (roleName) {
        case CREATE_CARD:
            if (!fullTrans) {
                return 'P3';
            } else {
                return 'P3: Tạo mới công việc';
            }
        case MANAGE_MEMBER:
            if (!fullTrans) {
                return 'P2';
            } else {
                return 'P2: Quản lý thành viên';
            }
        case UPDATE_CARD:
            if (!fullTrans) {
                return 'P4';
            } else {
                return 'P4: Cập nhật thông tin chung công việc';
            }
        case DELETE_CARD:
            if (!fullTrans) {
                return 'P7';
            } else {
                return 'P7: Hủy bỏ công việc';
            }
        case MANAGE_ROLE:
            if (!fullTrans) {
                return 'P8';
            } else {
                return 'P8: Quản lý vai trò';
            }
        case UPDATE_PROJECT:
            if (!fullTrans) {
                return 'P1';
            } else {
                return 'P1: Cập nhật dự án';
            }
        case UPDATE_CARD_STATUS:
            if (!fullTrans) {
                return 'P5';
            } else {
                return 'P5: Cập nhật trạng thái công việc';
            }
        case UPDATE_ASSIGNEE:
            if (!fullTrans) {
                return 'P6';
            } else {
                return 'P6: Cập nhật người thực hiện công việc';
            }
        default:
            break;
    }
};

const roleTransStringToID = (roleName) => {
    switch (roleName) {
        case 'Tạo mới công việc':
            return CREATE_CARD_ID;
        case 'Quản lý thành viên':
            return MANAGE_MEMBER_ID;
        case 'Cập nhật thông tin chung công việc':
            return UPDATE_CARD_ID;
        case 'Hủy bỏ công việc':
            return DELETE_CARD_ID;
        case 'Quản lý vai trò':
            return MANAGE_ROLE_ID;
        case 'Cập nhật dự án':
            return UPDATE_PROJECT_ID;
        case 'Cập nhật trạng thái công việc':
            return UPDATE_CARD_STATUS_ID;
        case 'Cập nhật người thực hiện công việc':
            return UPDATE_ASSIGNEE_ID;
        default:
            break;
    }
};

export { roleTrans, roleTransStringToID };
