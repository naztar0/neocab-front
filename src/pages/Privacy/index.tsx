import React, { useMemo } from 'react';
import { Button } from 'antd';
import { ArrowLeftOutlined } from '@ant-design/icons';
import { Helmet } from 'react-helmet';
import { Trans, useTranslation } from 'react-i18next';
import { ReactComponent as Logo } from '@/assets/images/logo.svg';
import './index.scss';

type ParagraphElements = {
  title: string;
  content: React.ReactElement;
};

type Paragraph = ParagraphElements & {
  paragraphs: null | ParagraphElements[];
};

export default function Privacy() {
  const { t } = useTranslation('privacy');

  const contents = useMemo(() => {
    const paragraphs = [
      'introduction',
      'privacy_policy_updates',
      'information_collection_and_use',
      'cookies_and_tracking',
      'aggregate_information',
      'disclosure',
      'verification_and_response',
      'links_to_third_party_sites',
      'security',
      'your_rights',
      'questions',
      'users_outside_of_the_ukraine',
    ];
    const subParagraphs: { [key: number]: string[] } = {
      9: [
        'your_right_to_rectification',
        'your_right_of_access',
        'your_right_to_move_your_data',
        'your_right_to_object_to_processing',
        'you_have_a_right_request_deletion',
        'you_have_a_right_to_lodge_a_complaint_with_a_supervisory_authority',
        'you_have_a_right_to_withdraw_your_consent',
      ],
    };
    const result: Paragraph[] = [];
    paragraphs.forEach((paragraph, index) => {
      const subs: ParagraphElements[] = [];
      if (subParagraphs[index]) {
        subParagraphs[index].forEach((sub, subIndex) => subs.push({
          title: `${index + 1}.${subIndex + 1}. ${t(`${paragraph}.${sub}.title`)}`,
          content: <Trans ns="privacy" i18nKey={`${paragraph}.${sub}.content`} components={{ p: <p /> }} />,
        }));
      }
      result.push({
        title: `${index + 1}. ${t(`${paragraph}.title`)}`,
        content: <Trans ns="privacy" i18nKey={`${paragraph}.content`} components={{ p: <p /> }} />,
        paragraphs: subs.length ? subs : null,
      });
    });
    return result;
  }, []);

  return (
    <div className="privacy-policy">
      <Helmet title={t('title') as string} />
      <div className="head">
        <Logo className="logo" />
      </div>
      <Button
        onClick={() => { window.location.href = '/'; }}
        icon={<ArrowLeftOutlined />}
        type="ghost"
      >
        <span><Trans ns="privacy" i18nKey="back" /></span>
      </Button>
      <div className="privacy-policy-container">
        <div className="side-nav-wrap">
          <div className="side-nav">
            <ul>
              {contents.map((content, index) => (
                <li>
                  <a className="anchor" href={`#${index}`}>{content.title}</a>
                </li>
              ))}
            </ul>
          </div>
        </div>
        <h1><Trans ns="privacy" i18nKey="title" /></h1>
        <span className="updated"><Trans ns="privacy" i18nKey="updated" /></span>
        <div className="content">
          {contents.map((item, index) => (
            <>
              <h3 id={index.toString()}>{item.title}</h3>
              {item.content}
              {item.paragraphs?.map((paragraph) => (
                <>
                  <h4>{paragraph.title}</h4>
                  {paragraph.content}
                </>
              ))}
            </>
          ))}
        </div>
      </div>
    </div>
  );
}
