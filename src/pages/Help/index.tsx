import React, {
  useEffect,
  useState,
  useMemo,
  useCallback,
} from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  Button,
  Collapse,
  Spin,
  Drawer,
  Form,
  Input,
  Popconfirm,
  message,
} from 'antd';
import {
  EditOutlined,
  DeleteOutlined,
} from '@ant-design/icons';
import { Helmet } from 'react-helmet';
import { AppDispatch } from '@/store/store';
import Layout from '@/components/Layout';
import {
  getFaqs,
  addFaq,
  editFaq,
  removeFaq,
} from '@/store/actions/faqs';
import { languages, FaqEditType } from '@/constants/help';
import { Language } from '@/constants/settings';
import { Role } from '@/constants/profile';
import './index.scss';

export default function Help() {
  const dispatch = useDispatch<AppDispatch>();
  const profileData: Profile = useSelector((state: any) => state.profileReducer.profile);
  const language: Language = useSelector((state: any) => state.languageReducer.language);
  const isLoading: boolean = useSelector((state: any) => state.faqReducer.isLoading);
  const dataSwitch: boolean = useSelector((state: any) => state.faqReducer.dataSwitch);
  const faqsData: FaqItem[] = useSelector((state: any) => state.faqReducer.faqs);

  const [drawerOpen, setDrawerOpen] = useState(false);
  const [editType, setEditType] = useState<FaqEditType | null>();
  const [currentFaq, setCurrentFaq] = useState<number | null>(null);

  useEffect(() => {
    dispatch(getFaqs({ lang: languages[language] }));
  }, [dataSwitch]);

  const inputContent = useMemo(() => [
    {
      qLabel: 'Question in English',
      qName: 'question_en',
      aLabel: 'Answer in English',
      aName: 'answer_en',
    },
    {
      qLabel: 'Question in Russian',
      qName: 'question_ru',
      aLabel: 'Answer in Russian',
      aName: 'answer_ru',
    },
    {
      qLabel: 'Question in Ukrainian',
      qName: 'question_uk',
      aLabel: 'Answer in Ukrainian',
      aName: 'answer_uk',
    },
  ], []);

  const onSave = useCallback((values: Object) => {
    if (editType === FaqEditType.add) {
      if (Object.values(values).some((value) => !value.trim())) {
        message.error('Please fill all fields').then();
        return;
      }
      dispatch(addFaq({ data: values }));
    } else if (editType === FaqEditType.edit && currentFaq) {
      values = Object.fromEntries(
        Object.entries(values).filter(([key, value]) => key && value?.trim()),
      );
      if (!Object.keys(values).length) {
        message.error('Please fill at least one field').then();
        return;
      }
      dispatch(editFaq({ faq: currentFaq, data: values }));
    }
    setEditType(null);
    setCurrentFaq(null);
    setDrawerOpen(false);
  }, [editType, currentFaq]);

  const getActions = useCallback((faq: number) => (
    <div className="actions">
      <Button
        shape="circle"
        icon={<EditOutlined />}
        onClick={(event) => {
          event.stopPropagation();
          setCurrentFaq(faq);
          setEditType(FaqEditType.edit);
          setDrawerOpen(true);
        }}
      />
      <Popconfirm
        title="Delete the question?"
        description="Are you sure to delete this question?"
        okText="Yes"
        cancelText="No"
        placement="left"
        onConfirm={() => {
          dispatch(removeFaq({ faq }));
        }}
      >
        <Button
          shape="circle"
          icon={<DeleteOutlined />}
        />
      </Popconfirm>
    </div>
  ), []);

  return (
    <Layout>
      <Helmet title="Help" />
      <div className="substrate">
        {(profileData?.role === Role.Admin) && (
          <div className="help-title">
            <span className="title">Help</span>
            <Button
              onClick={() => {
                setDrawerOpen(true);
                setEditType(FaqEditType.add);
              }}
            >
              Add faq
            </Button>
          </div>
        )}
        <Spin spinning={isLoading} size="large">
          <Collapse accordion className={`collapse ${isLoading ? 'expand' : ''}`}>
            {faqsData?.map((faq: FaqItem) => (
              <Collapse.Panel
                header={faq.question}
                key={faq.id}
                extra={profileData?.role === Role.Admin ? getActions(faq.id) : null}
              >
                <p>{faq.answer}</p>
              </Collapse.Panel>
            ))}
          </Collapse>
        </Spin>
        <Drawer
          title="Edit FAQ"
          placement="right"
          closable
          onClose={() => {
            setDrawerOpen(false);
          }}
          open={drawerOpen}
        >
          <Form
            layout="vertical"
            requiredMark={false}
            onFinish={onSave}
          >
            {inputContent.map((item) => (
              <div className="input-content" key={item.qName}>
                <Form.Item
                  label={item.qLabel}
                  name={item.qName}
                  rules={[{ required: editType === FaqEditType.add }]}
                >
                  <Input />
                </Form.Item>
                <Form.Item
                  label={item.aLabel}
                  name={item.aName}
                  rules={[{ required: editType === FaqEditType.add }]}
                >
                  <Input.TextArea />
                </Form.Item>
              </div>
            ))}
            <Button type="primary" htmlType="submit">Submit</Button>
          </Form>
        </Drawer>
      </div>
    </Layout>
  );
}
