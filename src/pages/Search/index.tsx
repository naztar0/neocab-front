import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useSearchParams } from 'react-router-dom';
import {
  Button,
  Divider,
  Input,
  Space,
  message,
  Pagination,
  Select,
  Spin,
  Steps,
  Table,
} from 'antd';
import {
  ArrowDownOutlined,
  ArrowUpOutlined,
} from '@ant-design/icons';
import { ColumnsType } from 'antd/es/table';
import { Helmet } from 'react-helmet';
import { AppDispatch } from '@/store/store';
import Layout from '@/components/Layout';
import {
  defaultPagePerPage,
  pageSizeOptions,
  searchPattern,
  searchPatternString,
  OrderType,
  StepType,
  DataType,
  UserDataType,
} from '@/constants/search';
import {
  getUserPhoto,
  getUserProfile,
  getUsers,
} from '@/store/actions/users';
import {
  getDepartments,
  getDepartmentSpecializations,
  getFaculties,
  getFacultySpecialities,
  getGroups,
  getGroupUsers,
  getProgramDepartments,
  getPrograms,
  getSpecialities,
  getSpecialityPrograms,
  getSpecializationGroups,
  getSpecializations,
} from '@/store/actions/groups';
import { resetUsers } from '@/store/reducers/user';
import { resetGroups } from '@/store/reducers/group';
import { resetDepartments } from '@/store/reducers/department';
import { resetSpecializations } from '@/store/reducers/specialization';
import { resetPrograms } from '@/store/reducers/program';
import { resetSpecialities } from '@/store/reducers/speciality';
import { resetFaculties } from '@/store/reducers/faculty';
import Avatar from '@/components/Avatar';
import UserModal from '@/components/UserModal';
import './index.scss';

export default function Search() {
  const dispatch = useDispatch<AppDispatch>();
  const [searchParams] = useSearchParams();
  const facultyLoading: boolean = useSelector((state: any) => state.facultyReducer.isLoading);
  const facultiesData: Pagination<Faculty> = useSelector((state: any) => state.facultyReducer.faculties);
  const specialityLoading: boolean = useSelector((state: any) => state.specialityReducer.isLoading);
  const specialitiesData: Pagination<Speciality> = useSelector((state: any) => state.specialityReducer.specialities);
  const programLoading: boolean = useSelector((state: any) => state.programReducer.isLoading);
  const programsData: Pagination<Program> = useSelector((state: any) => state.programReducer.programs);
  const departmentLoading: boolean = useSelector((state: any) => state.departmentReducer.isLoading);
  const departmentsData: Pagination<Department> = useSelector((state: any) => state.departmentReducer.departments);
  const specializationLoading: boolean = useSelector((state: any) => state.specializationReducer.isLoading);
  // eslint-disable-next-line max-len
  const specializationsData: Pagination<Specialization> = useSelector((state: any) => state.specializationReducer.specializations);
  const groupLoading: boolean = useSelector((state: any) => state.groupReducer.isLoading);
  const groupsData: Pagination<Group> = useSelector((state: any) => state.groupReducer.groups);
  const userLoading: boolean = useSelector((state: any) => state.userReducer.isLoading);
  const userData: User = useSelector((state: any) => state.userReducer.user);
  const usersData: Pagination<User> = useSelector((state: any) => state.userReducer.users);

  const [faculty, setFaculty] = useState<DataType>();
  const [speciality, setSpeciality] = useState<DataType>();
  const [program, setProgram] = useState<DataType>();
  const [department, setDepartment] = useState<DataType>();
  const [specialization, setSpecialization] = useState<DataType>();
  const [group, setGroup] = useState<DataType>();
  const [columnsDataSource, setColumnsDataSource] = useState<DataType[]>([]);
  const [usersDataSource, setUsersDataSource] = useState<UserDataType[]>([]);
  const [currentStepType, setCurrentStepType] = useState(StepType.Faculty);
  const [selectedStepType, setSelectedStepType] = useState(StepType.User);
  const [modalOpen, setModalOpen] = useState(false);
  const [searchValue, setSearchValue] = useState<string | null>(null);
  const [pagePerPage, setPagePerPage] = useState(defaultPagePerPage);
  const [orderType, setOrderType] = useState<OrderType>(OrderType.Asc);
  const [userSortingParams, setUserSortingParams] = useState<UserSortingParams>({ ordLastName: orderType });
  const [groupSortingParams, setGroupSortingParams] = useState<GroupSortingParams>({ ordName: orderType });

  useEffect(() => () => {
    setSearchValue(null);
    setCurrentStepType(StepType.Faculty);
    setSelectedStepType(StepType.User);
    setPagePerPage(defaultPagePerPage);
    dispatch(resetUsers());
    dispatch(resetGroups());
    dispatch(resetDepartments());
    dispatch(resetSpecializations());
    dispatch(resetPrograms());
    dispatch(resetSpecialities());
    dispatch(resetFaculties());
  }, []);

  useEffect(() => {
    if (searchParams.get('q')) {
      setSearchValue(searchParams.get('q'));
    } else {
      dispatch(getFaculties(
        { params: { ...groupSortingParams, ...pagePerPage } },
      ));
    }
  }, [searchParams]);

  useEffect(() => {
    if (faculty) {
      dispatch(getFacultySpecialities(
        { faculty: faculty.id, params: { ...groupSortingParams, ...pagePerPage } },
      ));
    }
  }, [faculty]);

  useEffect(() => {
    if (speciality) {
      dispatch(getSpecialityPrograms(
        { speciality: speciality.id, params: { ...groupSortingParams, ...pagePerPage } },
      ));
    }
  }, [speciality]);

  useEffect(() => {
    if (program) {
      dispatch(getProgramDepartments(
        { program: program.id, params: { ...groupSortingParams, ...pagePerPage } },
      ));
    }
  }, [program]);

  useEffect(() => {
    if (department) {
      dispatch(getDepartmentSpecializations(
        { department: department.id, params: { ...groupSortingParams, ...pagePerPage } },
      ));
    }
  }, [department]);

  useEffect(() => {
    if (specialization) {
      dispatch(getSpecializationGroups(
        { specialization: specialization.id, params: { ...groupSortingParams, ...pagePerPage } },
      ));
    }
  }, [specialization]);

  useEffect(() => {
    if (group) {
      dispatch(getGroupUsers(
        { group: group.id, params: { ...userSortingParams, ...pagePerPage } },
      ));
    }
  }, [group]);

  useEffect(() => {
    if (facultiesData?.data) {
      setCurrentStepType(StepType.Faculty);
      setColumnsDataSource(facultiesData.data.map((item) => ({
        key: item.id,
        id: item.id,
        name: item.name,
      })));
    }
  }, [facultiesData]);

  useEffect(() => {
    if (specialitiesData?.data) {
      setCurrentStepType(StepType.Speciality);
      setColumnsDataSource(specialitiesData.data.map((item) => ({
        key: item.id,
        id: item.id,
        name: item.name,
      })));
    }
  }, [specialitiesData]);

  useEffect(() => {
    if (programsData?.data) {
      setCurrentStepType(StepType.Program);
      setColumnsDataSource(programsData.data.map((item) => ({
        key: item.id,
        id: item.id,
        name: item.name,
      })));
    }
  }, [programsData]);

  useEffect(() => {
    if (departmentsData?.data) {
      setCurrentStepType(StepType.Department);
      setColumnsDataSource(departmentsData.data.map((item) => ({
        key: item.id,
        id: item.id,
        name: item.name,
      })));
    }
  }, [departmentsData]);

  useEffect(() => {
    if (specializationsData?.data) {
      setCurrentStepType(StepType.Specialization);
      setColumnsDataSource(specializationsData.data.map((item) => ({
        key: item.id,
        id: item.id,
        name: item.name,
      })));
    }
  }, [specializationsData]);

  useEffect(() => {
    if (groupsData?.data) {
      setCurrentStepType(StepType.Group);
      setColumnsDataSource(groupsData.data.map((item) => ({
        key: item.id,
        id: item.id,
        name: item.name,
      })));
    }
  }, [groupsData]);

  useEffect(() => {
    if (usersData?.data) {
      setCurrentStepType(StepType.User);
      setUsersDataSource(usersData.data.map((item) => ({
        key: item.id,
        ...item,
      })));
    }
  }, [usersData]);

  useEffect(() => {
    if (searchValue === null) {
      return;
    }
    switch (selectedStepType) {
      case StepType.Faculty:
        dispatch(getFaculties({ params: { search: searchValue, ...groupSortingParams, ...pagePerPage } }));
        break;
      case StepType.Speciality:
        dispatch(getSpecialities({ params: { search: searchValue, ...groupSortingParams, ...pagePerPage } }));
        break;
      case StepType.Program:
        dispatch(getPrograms({ params: { search: searchValue, ...groupSortingParams, ...pagePerPage } }));
        break;
      case StepType.Department:
        dispatch(getDepartments({ params: { search: searchValue, ...groupSortingParams, ...pagePerPage } }));
        break;
      case StepType.Specialization:
        dispatch(getSpecializations({ params: { search: searchValue, ...groupSortingParams, ...pagePerPage } }));
        break;
      case StepType.Group:
        dispatch(getGroups({ params: { search: searchValue, ...groupSortingParams, ...pagePerPage } }));
        break;
      case StepType.User:
        dispatch(getUsers({ params: { search: searchValue, ...userSortingParams, ...pagePerPage } }));
        break;
      default:
        break;
    }
  }, [searchValue, groupSortingParams, userSortingParams, pagePerPage]);

  const stepObjects = [
    [faculty, setFaculty],
    [speciality, setSpeciality],
    [program, setProgram],
    [department, setDepartment],
    [specialization, setSpecialization],
    [group, setGroup],
  ];

  const stepData = [
    facultiesData,
    specialitiesData,
    programsData,
    departmentsData,
    specializationsData,
    groupsData,
  ];

  const stepTitles = [
    'Faculty',
    'Speciality',
    'Program',
    'Department',
    'Specialization',
    'Group',
    'User',
  ];

  const userSortingList = [
    { key: 'ordFirstName', value: 'by first name' },
    { key: 'ordLastName', value: 'by last name' },
  ];

  const groupSortingList = [
    { key: 'ordName', value: 'by name' },
  ];

  const columns: ColumnsType<DataType> = [
    {
      render: (data) => (
        <span className="name">{data.name}</span>
      ),
      onCell: (data) => ({
        onClick: () => {
          const func = stepObjects[currentStepType][1];
          if (typeof func === 'function') {
            func(data);
          }
        },
      }),
    },
  ];

  const userColumns: ColumnsType<User> = [
    {
      key: 'name',
      dataIndex: 'name',
      render: (value, record) => (
        <div className="user-info" key={record.id}>
          <Avatar size={32} avatar={record.image} username={record.first_name} />
          <span className="name">{`${record.last_name} ${record.first_name} ${record.middle_name}`}</span>
        </div>
      ),
      onCell: (data) => ({
        onClick: () => {
          dispatch(getUserProfile({ user: data.id }));
          dispatch(getUserPhoto({ user: data.id }));
          setModalOpen(true);
        },
      }),
    },
  ];

  const isLoading = facultyLoading || specialityLoading || programLoading
    || departmentLoading || specializationLoading || groupLoading || userLoading;

  const getSteps = () => {
    if (searchValue !== null) {
      return [];
    }
    const steps = [];
    for (let i = 0; i < currentStepType; i++) {
      steps.push({ title: stepTitles[i], description: stepObjects[i][0]?.name, key: i });
    }
    return steps;
  };

  const onSelectStepType = (value: string) => {
    setSelectedStepType(stepTitles.indexOf(value));
  };

  const onSearch = (value: string) => {
    value = value.trim();
    if (searchPattern.test(value)) {
      setPagePerPage({ page: 1, perPage: pagePerPage.perPage });
      setSearchValue(value);
    } else {
      message.error('Search value must contain only letters, numbers and spaces').then();
    }
  };

  const onSelectSorting = (param: string) => {
    if (selectedStepType === StepType.User) {
      setUserSortingParams({ [param]: orderType });
    } else {
      setGroupSortingParams({ [param]: orderType });
    }
  };

  const onSelectOrder = () => {
    const value = orderType === OrderType.Asc ? OrderType.Desc : OrderType.Asc;
    if (selectedStepType === StepType.User) {
      setUserSortingParams({ [Object.keys(userSortingParams)[0]]: value });
    } else {
      setGroupSortingParams({ [Object.keys(groupSortingParams)[0]]: value });
    }
    setOrderType(value);
  };

  const getSelectedSorting = () => {
    const sortingParams = selectedStepType === StepType.User ? userSortingParams : groupSortingParams;
    const sortingList = selectedStepType === StepType.User ? userSortingList : groupSortingList;
    for (let i = 0; i < sortingList.length; i++) {
      if (Object.keys(sortingParams)[0] === sortingList[i].key) {
        return sortingList[i].value;
      }
    }
    return '-';
  };

  const total = ((currentStepType === StepType.User ? usersData?.total : stepData[currentStepType]?.total) || 0);

  return (
    <Layout>
      <Helmet title="Search" />
      <div className="substrate">
        <Space.Compact size="large">
          <Select
            className="search-select"
            defaultValue="User"
            size="large"
            onSelect={onSelectStepType}
          >
            {stepTitles.map((item) => (
              <Select.Option key={item} value={item}>{item}</Select.Option>
            ))}
          </Select>
          <Input.Search
            className="search-input"
            placeholder="Search"
            size="large"
            pattern={searchPatternString}
            onSearch={onSearch}
          />
        </Space.Compact>
      </div>
      <div className="substrate">
        <Steps
          progressDot
          current={currentStepType}
          direction="vertical"
          items={getSteps()}
          onChange={(step) => {
            setCurrentStepType(step);
            setColumnsDataSource(stepData[step]?.data.map((item) => ({
              key: item.id,
              id: item.id,
              name: item.name,
            })));
          }}
        />
        {searchValue !== null && (
          <Space.Compact>
            <Select
              className="sort-select"
              size="middle"
              onSelect={onSelectSorting}
              value={`Sort ${getSelectedSorting()}`}
            >
              {currentStepType === StepType.User ? userSortingList.map((item) => (
                <Select.Option key={item.key} value={item.key}>{item.value}</Select.Option>
              )) : groupSortingList.map((item) => (
                <Select.Option key={item.key} value={item.key}>{item.value}</Select.Option>
              ))}
            </Select>
            <Button
              className="sort-button"
              size="middle"
              onClick={onSelectOrder}
            >
              {orderType === OrderType.Asc ? <ArrowUpOutlined /> : <ArrowDownOutlined />}
            </Button>
          </Space.Compact>
        )}
        <Divider>{stepTitles[currentStepType]}</Divider>
        <Spin spinning={isLoading} size="large">
          {currentStepType === StepType.User ? (
            <Table
              columns={userColumns}
              dataSource={usersDataSource}
              pagination={false}
              showHeader={false}
            />
          ) : (
            <Table
              columns={columns}
              dataSource={columnsDataSource}
              pagination={false}
              showHeader={false}
            />
          )}
          {searchValue !== null && (
            <Pagination
              showSizeChanger
              onChange={(page, perPage) => setPagePerPage({ page, perPage })}
              total={total}
              pageSize={pagePerPage.perPage}
              current={pagePerPage.page}
              pageSizeOptions={pageSizeOptions}
              className="pagination"
            />
          )}
        </Spin>
      </div>
      <UserModal
        isLoading={userLoading}
        setModalOpen={setModalOpen}
        modalOpen={modalOpen}
        user={userData}
      />
    </Layout>
  );
}
