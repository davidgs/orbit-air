/* eslint-disable no-console */
import { React, useState } from 'react';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import {
  Alert,
  Col,
  FloatingLabel,
  FormControl,
  InputGroup,
  DropdownButton,
  Dropdown,
  Tooltip,
  OverlayTrigger,
} from 'react-bootstrap';
import { ClipboardData, Clipboard2CheckFill } from 'react-bootstrap-icons';

export default function LinkForm() {
  const [validated, setValidated] = useState(false);
  const [username, setUsername] = useState('');
  const [linkSource, setLinkSource] = useState('');
  const [linkTarget, setLinkTarget] = useState('');
  const [linkType, setLinkType] = useState('');
  const [fullLink, setFullLink] = useState('');
  const [typePrefix, setTypePrefix] = useState('');
  const [copied, setCopied] = useState(false);
  const [linkOrigin, setLinkOrigin] = useState('Pick a base target');
  const [show, setShow] = useState(false);
  const [typeDef, setTypeDef] = useState('');
  const [linkTypes] = useState([
    'Blog Post',
    'Twitter',
    'LinkedIn',
    'Facebook',
    'dev.to',
    'DZone',
    'Medium',
    'GitHub',
    'GitLab',
    'Stack Overflow',
    'Reddit',
    'Slack',
    'Discord',
    'Email',
    'Other',
  ]);
  const [linkOriginTip, setLinkOriginTip] = useState(
    'You must select a target domain first'
  );

  // set all the option values once a division is chosen
  const getOptions = linkTypes.map((type) => {
    const t = type.toLowerCase().replace(/ /g, '');
    return (
      // eslint-disable-next-line react/jsx-filename-extension
      <option key={`${typePrefix}-${t}`} value={`${typePrefix}-${t}`}>
        {type}
      </option>
    );
  });

  // Copy link to the clipboard and change the icon to a checkmark
  function copyMe() {
    navigator.clipboard.writeText(fullLink);
    setCopied(true);
  }
  const clearForm = () => {
    setUsername('');
    setLinkSource('');
    setLinkTarget('');
    setLinkType('');
    setFullLink('');
    setTypePrefix('');
    setCopied(false);
    setLinkOrigin('Pick a base target');
    setValidated(false);
    setTypeDef('');
    document.getElementById('username').value = '';
    document.getElementById('source').value = '';
    document.getElementById('target').value = '';
  };

  const handleSubmit = (event) => {
    console.log('handleSubmit');
    const form = event.currentTarget;
    if (form.checkValidity() === false) {
      event.preventDefault();
      event.stopPropagation();
    } else {
      const vun = new RegExp(/[A-Za-z]{2} [A-Za-z]{2}/);
      if (!vun.test(username)) {
        setValidated(true);
        event.preventDefault();
        event.stopPropagation();
        return;
      }
      setValidated(true);
      event.preventDefault();
      const uname = username.replace(/ /g, '');
      const lt = linkTarget === '-' ? '' : linkTarget;
      setFullLink(
        `${linkOrigin}${lt}?utm_source=${linkSource}&utm_medium=${linkType}&utm_campaign=${uname}`
      );
      setShow(true);
      console.log('Full Link: ', fullLink);
    }
    setValidated(true);
  };

  return (
    <div>
      <OverlayTrigger
        placement="auto"
        delay={{ show: 250, hide: 400 }}
        rootClose
        overlay={
          <Tooltip id="alert-tooltip">
            Closing this will reset the form and remove your link
          </Tooltip>
        }
      >
        <Alert
          key="primary"
          variant="primary"
          onClose={() => {
            setShow(false);
            clearForm();
          }}
          dismissible
          show={show}
          style={{ display: 'inline-block' }}
          className="content-center"
        >
          <div
            id="link-output"
            className="content"
            style={{ display: 'inline-block' }}
          >
            <p>
              {copied && (
                <OverlayTrigger
                  placement="auto"
                  delay={{ show: 250, hide: 400 }}
                  rootClose
                  overlay={
                    <Tooltip id="alert-tooltip">
                      You have successfully copied the link!
                    </Tooltip>
                  }
                >
                  <Clipboard2CheckFill
                    style={{
                      fontSize: '2rem',
                      title: 'Link copied to clipboard!',
                    }}
                  />
                </OverlayTrigger>
              )}
              {!copied && (
                <OverlayTrigger
                  placement="auto"
                  delay={{ show: 250, hide: 400 }}
                  rootClose
                  overlay={
                    <Tooltip id="alert-tooltip">
                      Click here to copy your link!
                    </Tooltip>
                  }
                >
                  <ClipboardData
                    tabIndex={0}
                    style={{ fontSize: '2rem', cursor: 'pointer' }}
                    // eslint-disable-next-line react/jsx-no-bind
                    onClick={copyMe}
                    // eslint-disable-next-line react/jsx-no-bind
                    onKeyPress={copyMe}
                    title="Click to copy your link!"
                  />
                </OverlayTrigger>
              )}
              <strong>{fullLink}</strong>
            </p>
          </div>
        </Alert>
      </OverlayTrigger>
      <div id="link-form" className="content">
        <Form noValidate validated={validated} onSubmit={handleSubmit}>
          <Form.Group>
            {/* Name input */}
            <OverlayTrigger
              placement="auto"
              delay={{ show: 250, hide: 400 }}
              overlay={
                <Tooltip id="name-tooltip">
                  Enter Your First and Last Names
                </Tooltip>
              }
            >
              <FloatingLabel label="Your full name" size="sm">
                <Form.Control
                  required
                  name="username"
                  id="username"
                  size="sm"
                  type="text"
                  onBlur={(eventKey) => {
                    console.log('onBlur', eventKey.target.value);
                    setUsername(eventKey.target.value);
                  }}
                />
                <Form.Control.Feedback type="invalid">
                  We really need your full name.
                </Form.Control.Feedback>
              </FloatingLabel>
            </OverlayTrigger>
          </Form.Group>
          <p />
          {/* Source input */}
          <Form.Group>
            <OverlayTrigger
              placement="auto"
              delay={{ show: 250, hide: 400 }}
              overlay={
                <Tooltip id="source-tooltip">
                  Where will you be posting this link?
                </Tooltip>
              }
            >
              <FloatingLabel label="Referral Source">
                <Form.Control
                  required
                  name="source"
                  id="source"
                  type="text"
                  size="sm"
                  onBlur={(eventKey) => {
                    console.log('onBlur', eventKey.target.value);
                    setLinkSource(
                      eventKey.target.value.replace(
                        /^((http[s]?|ftp):\/\/)/,
                        ''
                      )
                    );
                  }}
                />
                <Form.Control.Feedback type="invalid">
                  The link has to come from somewhere!
                </Form.Control.Feedback>
              </FloatingLabel>
            </OverlayTrigger>
          </Form.Group>
          <p />
          <Form.Group>
            <InputGroup className="mb-3" size="lg">
              <DropdownButton
                variant="outline-secondary"
                required
                title={linkOrigin}
                id="input-group-dropdown-1"
                onSelect={(eventKey) => {
                  console.log('onSelect', eventKey);
                  setLinkOrigin(eventKey);
                  setLinkOriginTip(
                    "Where will this link point to? If it's to the top-level, just enter '-' here."
                  );
                  // console.log('Type Prefix: ', linkOrigin);
                }}
              >
                <Dropdown.Item
                  style={{ color: 'black' }}
                  id="camunda"
                  eventKey="https://camunda.com/"
                >
                  https://camunda.com/
                </Dropdown.Item>
                <Dropdown.Item
                  style={{ color: 'black' }}
                  id="docs"
                  eventKey="https://docs.camunda.io/"
                >
                  https://docs.camunda.io/
                </Dropdown.Item>
                <Dropdown.Item
                  style={{ color: 'black' }}
                  id="cloud"
                  eventKey="https://cloud.camunda.io/"
                >
                  http://cloud.camunda.io/
                </Dropdown.Item>
                <Dropdown.Item
                  style={{ color: 'black' }}
                  id="forum"
                  eventKey="https://forum.camunda.io/"
                >
                  http://forum.camunda.io/
                </Dropdown.Item>
                <Form.Control.Feedback type="invalid">
                  The link has to point to a Camunda web Property!
                </Form.Control.Feedback>
              </DropdownButton>
              <OverlayTrigger
                placement="auto"
                delay={{ show: 250, hide: 400 }}
                overlay={<Tooltip id="target-tooltip">{linkOriginTip}</Tooltip>}
              >
                <FormControl
                  required
                  disabled={linkOrigin === 'Pick a base target'}
                  id="target"
                  aria-label="Referral Target"
                  aria-describedby="target-tooltip"
                  onBlur={(eventKey) => {
                    console.log('onBlur', eventKey.target.value);
                    setLinkTarget(eventKey.target.value);
                  }}
                />
              </OverlayTrigger>
              <Form.Control.Feedback type="invalid">
                If it&apos;s pointing to the main site, use a `-` in this field.
              </Form.Control.Feedback>
            </InputGroup>
          </Form.Group>
          <p />
          <Form.Group as={Col} md={12}>
            <OverlayTrigger
              placement="auto"
              delay={{ show: 250, hide: 400 }}
              overlay={
                <Tooltip id="type-tooltip">
                  What Division/Group are you in?
                </Tooltip>
              }
            >
              <FloatingLabel label="Your Division/Group">
                <>
                  <Form.Select
                    required
                    id="type"
                    value={typeDef}
                    onChange={(eventKey) => {
                      console.log('onSelect', eventKey.target.value);
                      setTypePrefix(eventKey.target.value);
                      setTypeDef(eventKey.target.key);
                      console.log('Type Prefix: ', typePrefix);
                    }}
                  >
                    <option defaultValue>
                      {typePrefix === '' ? 'Choose one ...' : 'Choose one ...'}
                    </option>
                    <option value="devrel" key="DevRel">
                      DevRel
                    </option>
                    <option value="marketing">Marketing</option>
                    <option value="product">Product</option>
                    <option value="engineering">Engineering</option>
                    <option value="cto">CTO</option>
                    <option value="ceo">CEO</option>
                  </Form.Select>
                  <Form.Control.Feedback type="invalid">
                    You must choose a Division/Group!!
                  </Form.Control.Feedback>
                </>
              </FloatingLabel>
            </OverlayTrigger>
          </Form.Group>
          <p />
          <Form.Group as={Col} md={12}>
            <OverlayTrigger
              placement="auto"
              delay={{ show: 250, hide: 400 }}
              overlay={
                <Tooltip id="type-tooltip">
                  {typePrefix === ''
                    ? 'Select a Division First Please'
                    : 'What kind of referral link is this?'}
                </Tooltip>
              }
            >
              <FloatingLabel label="Referral Type">
                <>
                  <Form.Select
                    required
                    disabled={typePrefix === ''}
                    onChange={(eventKey) => {
                      console.log('onSelect', eventKey.target.value);
                      setLinkType(eventKey.target.value);
                    }}
                  >
                    <option defaultValue>
                      {typePrefix === ''
                        ? 'Select Division First'
                        : 'Choose one ...'}
                    </option>
                    {getOptions}
                  </Form.Select>
                  <Form.Control.Feedback type="invalid">
                    You must select the link type!
                  </Form.Control.Feedback>
                </>
              </FloatingLabel>
            </OverlayTrigger>
          </Form.Group>
          <p />
          <Form.Group>
            <Button variant="primary" type="submit">
              Submit
            </Button>
            &nbsp;&nbsp;
            <Button variant="outline-primary" type="reset">
              Reset
            </Button>
          </Form.Group>
        </Form>
      </div>
    </div>
  );
}
