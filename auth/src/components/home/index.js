import React from 'react'
import {HeroSection, Inner, Image, HeroText, InnerLeft, InnerRight, Button, BottomSection,
  BottomText, Content, ContentText, } from './homeelement'
import logo from '../../images/logoblue.png'


const Homecontent = () => {
  return (
    <>
      <HeroSection>
          <Inner>
            <Image src={logo} />
          </Inner>
          <Inner>
            <HeroText>Chào mừng đến với Tmaster, cổng kỹ sư cơ khí để xuất bản, đào tạo và cộng đồng thiết kế 3D</HeroText>
          </Inner>
          <Inner>
            <InnerLeft>
              <Button  className='left'>TMASTER ĐĂNG KÝ</Button>
            </InnerLeft>
            <InnerRight>
              <Button className='right'>TMASTER ĐĂNG NHẬP</Button>
            </InnerRight>
          </Inner>
      </HeroSection>
      <BottomSection>
        <Inner>
          <BottomText className='bigtext'>LỢI ÍCH THÀNH VIÊN</BottomText>
        </Inner>
        <Inner>
          <Content>
            <ContentText className='title'>CHỢ BẢN VẼ 3D</ContentText>
            <ContentText className='content'>Tiếp cận cơ sở khách hàng 3D lớn nhất trên thế giới. Chúng tôi bán nội dung của bạn cho các nhà quảng cáo, kiến trúc sư, nhà phát triển trò chơi và hãng thông tấn hàng đầu thế giới.</ContentText>
            <ContentText className='title'>HƯỚNG DẪN CHUYÊN NGHIỆP</ContentText>
            <ContentText className='content'>Chúng tôi cung cấp đào tạo từ các chuyên gia hàng đầu trong ngành để giúp bạn vượt trội trong nghề của mình. Đào tạo bao gồm kết cấu, ánh sáng và tổng hợp 3D nâng cao.</ContentText>
          </Content>
          <Content>
            <ContentText className='title'></ContentText>
            <ContentText className='content'></ContentText>
            <ContentText className='title'></ContentText>
            <ContentText className='content'></ContentText>
          </Content>
          <Content>
            <ContentText className='title'></ContentText>
            <ContentText className='content'></ContentText>
            <ContentText className='title'></ContentText>
            <ContentText className='content'></ContentText>
          </Content>
        </Inner>
        <Inner>
          <Button className='center'>BẮT ĐẦU THIẾT KẾ HÔM NAY</Button>
        </Inner>
      </BottomSection>
    </>
  )
}

export default Homecontent