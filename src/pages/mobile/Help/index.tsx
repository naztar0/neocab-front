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
import { useTranslation, Trans } from 'react-i18next';
import { AppDispatch } from '@/store/store';
import Layout from '@/components/mobile/Layout';
// noinspection DuplicatedCode
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
  const { t } = useTranslation();
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
      qLabel: t('help.question_in_english'),
      qName: 'question_en',
      aLabel: t('help.answer_in_english'),
      aName: 'answer_en',
    },
    {
      qLabel: t('help.question_in_russian'),
      qName: 'question_ru',
      aLabel: t('help.answer_in_russian'),
      aName: 'answer_ru',
    },
    {
      qLabel: t('help.question_in_ukrainian'),
      qName: 'question_uk',
      aLabel: t('help.answer_in_ukrainian'),
      aName: 'answer_uk',
    },
  ], [t]);

  const onSave = useCallback((values: Object) => {
    if (editType === FaqEditType.add) {
      if (Object.values(values).some((value) => !value.trim())) {
        message.error(t('common.messages.fill_all_fields')).then();
        return;
      }
      dispatch(addFaq({ data: values }));
    } else if (editType === FaqEditType.edit && currentFaq) {
      values = Object.fromEntries(
        Object.entries(values).filter(([key, value]) => key && value?.trim()),
      );
      if (!Object.keys(values).length) {
        message.error(t('common.messages.fill_one_field')).then();
        return;
      }
      dispatch(editFaq({ faq: currentFaq, data: values }));
    }
    setEditType(null);
    setCurrentFaq(null);
    setDrawerOpen(false);
  }, [editType, currentFaq, t]);

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
        title={t('help.delete_question')}
        description={t('help.sure_to_delete_question')}
        okText={t('common.buttons.yes')}
        cancelText={t('common.buttons.no')}
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
      <Helmet title={t('common.menu.help') as string} />
      <div className="substrate">
        {(profileData?.role === Role.Admin) && (
          <div className="help-title">
            <span className="title">
              <Trans i18nKey="common.menu.help" />
            </span>
            <Button
              onClick={() => {
                setDrawerOpen(true);
                setEditType(FaqEditType.add);
              }}
            >
              <span><Trans i18nKey="help.add_question" /></span>
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
          title={editType === FaqEditType.add ? t('help.add_question') : t('help.edit_question')}
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
            <Button type="primary" htmlType="submit">
              <span><Trans i18nKey="common.buttons.submit" /></span>
            </Button>
          </Form>
        </Drawer>
      </div>
    </Layout>
  );
}
