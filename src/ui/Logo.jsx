import logo from '../assets/logo.png';
function Logo() {
  return (
    <div className="flex items-center">
      <img src={logo} alt="DUE Logo" className="w-16" />
      <p className="font-montserrat text-center text-[13px] text-[#1561A3]">
        ĐẠI HỌC ĐÀ NẴNG <strong>TRƯỜNG ĐẠI HỌC KINH TẾ</strong>
      </p>
    </div>
  );
}

export default Logo;
