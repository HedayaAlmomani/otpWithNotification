import React, { useState, useEffect } from "react";
import Input from "../../../CoreComponent/Input";
import ImageUpload from "../../../CoreComponent/ImageUpload";
import httpServices from "../../../common/httpServices";
import Toast from "../../../CoreComponent/Toast";
import Select from "../../../CoreComponent/Select";
import { form, documentsTypesOptions } from "./helper";
import { useAuth } from "../../../common/authContext";
import "./style.scss";

const UserForm = () => {
  const [formData, setFormData] = useState(form);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { userData } = useAuth();

  const fetchUserData = async () => {
    setFormData({
      email: userData?.email || "",
      full_name: userData?.full_name || "",
      kyc_document_type: userData?.kyc_document_type || "",
      kyc_document_front: userData?.kyc_document_front || null,
      kyc_document_back: userData?.kyc_document_back || null,
      kyc_selfie_image: userData?.kyc_selfie_image || null,
      referral_code: userData?.referral_code || "",
      referred_by: userData?.referred_by || "",
    });
  };

  const handleChange = (key, value) => {
    setFormData((prev) => ({ ...prev, [key]: value }));
  };

  const handleFileChange = (key, file) => {
    setFormData((prev) => ({ ...prev, [key]: file }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formDataToSend = new FormData();
    if (formData.email) formDataToSend.append("email", formData.email);
    if (formData.full_name)
      formDataToSend.append("full_name", formData.full_name);
    if (formData.kyc_document_type)
      formDataToSend.append("kyc_document_type", formData.kyc_document_type);
    if (formData.referral_code)
      formDataToSend.append("referral_code", formData.referral_code);
    if (formData.referred_by)
      formDataToSend.append("referred_by", formData.referred_by);
    if (
      formData.kyc_document_front &&
      typeof formData.kyc_document_front !== "string"
    ) {
      formDataToSend.append("kyc_document_front", formData.kyc_document_front);
    }
    if (
      formData.kyc_document_back &&
      typeof formData.kyc_document_back !== "string"
    ) {
      formDataToSend.append("kyc_document_back", formData.kyc_document_back);
    }
    if (
      formData.kyc_document_back &&
      typeof formData.kyc_selfie_image !== "string"
    ) {
      formDataToSend.append("kyc_selfie_image", formData.kyc_selfie_image);
    }

    try {
      const response = await httpServices.post(
        `http://localhost:8000/api/user`,
        formDataToSend
      );
      const toastOptions = {
        mode: "success",
        message: "Data updated successfully!",
      };
      Toast(toastOptions);
    } catch (error) {
      console.error("Error:", error);
    }
  };
  const isFormValid = () => {
    return (
      formData.email &&
      formData.full_name &&
      formData.kyc_document_type &&
      formData.kyc_document_front &&
      formData.kyc_document_back &&
      formData.kyc_selfie_image
    );
  };
  useEffect(() => {
    fetchUserData();
  }, [userData]);
  return (
    <div className="user-form-container">
      <img
        src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAOEAAADhCAMAAAAJbSJIAAAAllBMVEXyeiH////teCH7+/vxeSHueCHweSHveCH6+vr+/v78/Pz9/f3xcgD8///xcADyeB3scADydhX++fX6zrTzhjrydA34u5b//Pn+9O396+L2qX72o3T1nmn0waL449X0kVTzgi784M/0kE31mV/3sYf2qXjzhTf859nzi0Pzt5H30Lj0xaj4v5332sj0jUn20r/3tIv1nGQCcIx9AAAV8ElEQVR4nNVdaUO7PAwvHtNtPSis29jhmDvVTf1//y/3tBQYlKuUoj5749QA+ZGkSZO0BSMn+ozux/LL/f0w+jm8v5d/GN+rJKOYRIc2IXEQcuJ/oeQPqOnRw+R21fdtZhM0XvlcA9Cpon0e33B582D7vn7bL5ar3W6z2ex2q+Vi/7Z+3wZzLwO9mumxxrstPDohAfGf9aXSQoLey9fbcnMEELsuY5R/CCE0/rgQQzDZLN++Tl72vnWPNmBzCFoyXSfB9JULqZz8w4RQyASoh7u7ByA+g7tHEH95Ej/4/wiDjEwO/nZUebtO1nEPyv6sIfsaFUXe9rLjAqJPj4MIThHgkwQIwOPdIAJKXRfuLluhtOrtWqloEaBAaGmQiZ8SfKxCzGjKvQZA/hEklGGw+jgpjzaywayiAS3lftY0hNP0k7qUxNw/VAAcFAAmtIS47DwVIFOAuo+uZBOYKXdBRbkPmF+48MijwrSuBGNajpLB8BKonsScTWDFBhGa+zsOj3M/yHPfGmAkSupuPjwnp6L63kxhE9iwQedlP4A04r4RYLWK5mgpHCxOCBlIUKUFFgBeNy4jIA+wvQ2qtIS5m69OAOVPUHFlk+w57XP0ZeYfXaLJtJaKZmgJDv2ZXhBVzSbQBFjxGr11iJ+eEo5s2GCelmO8eEjfD5a8DFB6ZXH8LQe4DuHDXRFgdxW9vQzihutZBUAdNkfA1E1wEj+EZGALYJkEJQmBA78eYK03A4ZuYuxsz5iANgBbq2hKS/DkipChNwNmoygKlhxfKUBrNpilJe4qMGBTenyDUA2hKWVNamfBBrMvg7JpWzZjj99euR30coTEAtPaEoxuR+Bxy7nSZjOBBBSAzeOv4+0xyUmlbxVNbkfwwlPZbI4oQYMEC8rtXI8sr3b2QrXGl+Eer3k2G7yZoAVtAb7FEcxP2mBC+8hV9btt4gG0i4GCs6sw3aubyN7uQZLASYB0I8oIEmgVqvnx7PbnbTABKKZWfrWKqhLkkECb1NbefWovwU4q+lDyMp7gIg+wfvYP9N2E9+patisDCUa08HOulXiIIAHtGGg7ICrAn1fRmJaCLWoGKCGBShVVbNBnAysAtYLtahVNjNH1y9ksDitAAVil3Bf8aKCi/anzAF/K2CzxfCCvolXKfcD9M62rorHy4EOtm0hlBpwyG1TG39kKFgD+mg2mj4ar55FGegPoxEA7ZgLQupvIAwTA3cyaVJRDAs0x0Oy1FqC+ipoBrJCgoGWvs3IJZiGBRhv0ztQOQKsqKmnZ2WvMwIEmNzGrB/hLNpjQ0vMMNWRhQJObeC0C7NtN6NhgQktfq1VUQqqqcseyH9YPMr+qopKE7mbVNnhDWBmq/TMaRX8Q4N0D/FdtgynCylBtYckPtgjV2r8MeKhNMQKnxg9ejCKZHkO18neLL6hmglRW5U5U1DeKRX9URSVJEoaXej5QLcEtKwD8azaYcMe2FSoqq9wVAOeDJ4NR9MdVNCIhYF4WfUZIClXuNER4rZvwGoVqBabtSFCQ0M9bi5hidWqVOwW4L6Qs/pYfVB4NF1UZuNTjq1m1OoB/yQYTElfNwDX0tQVUzar9pVCt9NE0KAWYr3LfahNnNS/6N91E9t3Sc4mKxlXuYvHluyaz/QdVVLIJv0vbbkBp8cUKwF5DtSJADvGqphhllbsI0Dv+ZvFFpdXPlpCjV+IYQDHpj/ZK+ezv22BMwvYFCd6q3JkS9hbnr/w/2GBMi7cFgEmVO9uEcKys8HZU0bQDmpBygGZuIkNCjkXHAHK/CYBT2BagziDzRCEj4Wa52C+WmyNhkD5ZVlGZQ50W0jZABRjQXBOClVCNUHey9E+zdAnC7OQvj1A8yS5A/qTAyQNU+9pGzpJWADR2EwTSxVXmbkdpLzhC3vbAmPFsIg/wRkuXCsBCX9sWlr2aDjZIGLvMk47fBOC9jK3mU5cCCwCzj4bbvFLKvrb4N1HVOJN2AJtUlNLpMI36E4DP6YKT5++o6d2OikZskrOy6AbkU8Y+tusm8L8AJeUgVYL8lfKAP9hBC24iQ4v9fH+h0tcWljfjGdogwR9OA0AnKk12CNUKbJIwmQoP4yp3FuAF2vSDdPDijBsB8jCYkPx9uxW23HVuOM31tXlhq37RBhWl57kOwPEzCibUHsC7p9CTD8hWuWO4a2jRBunZ0wP4zAfVI7Vig3EWfJ2qqJPva5uFFlua6VEfIIcYEksSFMNpOKvoa/OxPTdBwjIVfVYBDiVAxwkGA1sA5XCaLpvK9rWFJV33pn6QbVtIkJOgL9gaYCWb5IhSgONMX9vVteYmAL7cAN5rAOS039AcoErrXhOA2b42Z6O/MKRJT+hZR4LDLEDHOWotm9IKuMgmBXjra0MvrjbAxtkEvEUy95U2OM4DdE7QXoMHPDlJHSPta0MLFnPffUbP9s2RTAGg4xyoFRUVtCKfEdcxkr620XxgZXGW+EHA/N4AIAoIyd23Q76L3HmJQ0z62pAPda4slaA6o+cibGuDEQk6MEsAuZ34KOvxhcJulPWDHbJqblAxH6yToLDXE7QFEJBNwkPS1xZgYMcGszdvCVBU9CzYoCTBMp1x62u7MCtuQpDcqkBtATof0I4EuRxY3J2Z9rWFxMwGS/IsrpcH2Ogmbi7Fw7YA8rDRyfW1nbC1xG/sbQ0kyIfTV9IEUJtNfMr1tU2ZteJLtALLDOA9+mb6ABsUjU1Rtq/tk9ixQRFOvNcCLHMTqTqjd9jl0Tk5kE+UqXIHtPNGASktnhtKUNirGNJtFbbi5LBE+OHascHHKKAxVFFBOwfVG6G09Wbw44YQrWjTq9Few0smM3OAzmxCOkkwS0tX0X0jj+/dNW3WoV/hJRtDG5S0r8SOinJaEnpJX1tSMbRSAKW7kaENRp8dsQUQiGqi7Gu7jwKa7m5CfiE7ZKqinHa0U1KnXZJ/7IKivjZ+8x2tfTWtXmPs8M0APt9viC0JRi876WuD7a6s38vic5ZVuzYqymlnn8QaQHDniruKvjYesllwEzFtZN9GNijGIS8kllRUsIlFLkOMpXzyaxjSFwFy7Z+bqiinnTNrAEUt0Y8RHqjNvSz4izNxE5KWq5MlFRW09BBXuSdPlmwwooUfyExFBe0HtGWDgoRMZJXbI7r7qukABHSBDFWUfxZWF+gQ4kVz/BdqxU2kHIXIGKAT2l3HyV4Qt8OkYmBHgpw2GsEMbJB/TpbXUrtfwh+it4pZp2krl9yEpL0N8s8bVQB2TP7RaZTzXtLSKw13BBpEGRIjFR2iUGmK7Jp4EN01YBhVZGzNOiNa+OVoqGjRZyb20t1NJHIQISSIukntqaj4QTfIQEXHzyjKStuywahOO/E4wtJpdbd2yrR81w7gtbJn0NSbETBHwAmgVRUVJOS1tQ2KcuNrVUud+bwcBiPgbLG9QSZhBH/U22DpzOMDd323RUXDWy7Dd9euika0cN5SRZ+dedueQR023Xduh2vXJsCYlm6cVirKacUwY73z2l07IHb41madMQl8Q+0AitZk+4sDePQB4s58myoafYkrUJoqmm+KtFUjehTVbsDD+T4APhL41QLgF+xnh0K64AiX1NYoqnhbeNVW0WsFwM7JPx62AWdFbdtg3BBLoI/0APpZgFZaCRJauuLeYkftq6j8z4P7pqWib7grwJr8tEBIegLIafFu3ijB+c5y53WWlgiEm8J6X7NQrfQpYvOReoDehFmcTai0ZOeAtJ2tl0XKhM1RvYoGvdlglJ/eOGAkpyw9qKgYa8ilAaDjLDHtxwYFLY+twDgqWlgJ1RSAFL9+3CRYnSR+WQCodpzZSv5RoaW73JzF2mukeHUSS0YaAY5HyFtzadsL1TJsRghF/de6ilK2zI2ijYWaj6NrXUWB8IcyprEN8MndnTT8YAag48zWgFkHyGMaJOJSyyr65B6/8o5eq1CD5gexe6+dOm0mAQ+cfaehrChB4u5neYDatcRtyCxvuUHF3GJKraooPW4dQ4BcVQ+uRRXltFTMD9dqf3cngHjlKQDbtX290/L8tOFQwcQc/x3mr+wSqhF8QR0ARqv1QmYxPw3fOULZamJFgoR+qQDb1/NnO2YvfYu3jsiXWgN499IdIP8c7OXGYCBz3hZm9ALgIOimojHtPdrjhkfrsima7ACfvhArfpBaAihI9thOZoVMPNHJviFWVDQsADTsqRG0e2hBRaOmelHlXhIrg4wVG0xpl9RG4oEe0BA4SUq424weF0ZRQxVNVu2+Vk1b28zL6Zvogk7qkp1CNby2KsHx88iLVil1TDzIOr5zimTYKZJhS8sAOckpOuSsW0TJTlFfmycWVHUCKEqtFlU0Xrq4hp1ndcSTXV8T0jGrhl/sAoxp/5GOkx4ycZK+tm4TXs3EbzsJiuZsmF+t11rR0r423+0E8Ok87APg6Bn5HUNm6Me7t7y42leWViGvVlX0PkMrMp0d0reiTTLqZB91avuSTf+2bVDSnmAXgAA68alkMqFomFUbsKAXFZVfFrRDREl3ovYV7d4ievVNM9ts0ZeKis887ps08mYsmo5Hu7fwSbBx8QU3V5cMVVTQJivMjUoo7lbcI9q9xeOTV8PaRCRCWypapB3OsTHAR7mLi1zZtSKmxRc+ie7LBiWtKMKbuWsih8Bk7ZohQLrrzwbl7ba4ojTZyKZcuyZ3b0EB1b8y9xT43p8NxrTpWq+2k55o/WG6e0t+qYp+ATT0TBY060uQf9b68UiOTfIZAUxOJZsyE4CiLNCnDQqSUbyXRGtvJparZ04ly67kaDFngdcuS/F0APK7bNrHI9EWOaf87i2hVkdGXoKA0FFfbmJ0I1lDk3iEhMqpZBe3tYryu6xQvyoakQTQJODiSirvEu/e4gRue4DpLuE9qWhCaxSP4CDWr3T3lk15w0KtM4p31+jJTQwT2iVtD5Bu8ru3cIX1YVsJ8v+0Zbq1DUYfk3gE+uruLY7I3rUDGC8H79UGxZfRC1Yf3dxSF8a5seypZAvWTkUHgL05fbqJdG3wCLYFOKD7BGC0X5u85wm2yt0NojRIXzaYX3RzJnUASzMrp/i+Y+7x051T1P3a6lUURD61p1Atu/BtGM0v2gVcyQ4yuVPJxuiKG6/MAQRsPupdRSPab9a26/OaArydSsZ/C7MbiTfv0kzC+X2/biKhvTAdgDc2xcblUkWdzDmkY9kvry9BQM7eUJdpIzeRfvFbBlzYTyWYenzZIxCSFgAB2XQC2Owmki/o2i7gEvuXKqeSjePf1m4LgI9kZxdgSqLSJg5RO7OyTlXUiXdvSeB6IVGvrLBB8RQ5YPVtg2LZnmyI0XXXYleHzDFdIANwhNZQW4LC46+HTnoASG8qitD8tbRYWsUmF2H+VLLxDe4wGk51AfJ7wX+XF69XgPPr9yembQCKieHzDaADxrlTyXysqaLxU4gLj0v/ZeagyoVcZn5wFKGb7u5cRtqoqNhEGGVldjuVLNa22z5NOgAFLaEQhrvLdpbjvttsAqHgfX8GkCU1Uv3EAzmj/NnwN48vb351dVU0l94jDGOwunzN1XJ3m6yaDK9mwfvbBmKOjhjkxgBWDwxSTyVLtv0y2MyfUOa6x3/7yzWYj6q3UioCjB/tzYOvy+GVYJcWdqHXBkhX6olI6qlk8RkluiqaIxHtWRwmw/T4uTtM37ccqZOonfyZ7pSOkneA0Gx+ur5PD7vzHYSMEtMiGJBvOd07NXcqWe7Ipyk0kmC2/+zxgVDKIKSEhJ//Ft/rD//9uj2dTkEQzIOAf9lev979j8u3wEUEKYdmmBfN0SYtBZnzdIAKUOw6be9ADSLOB+LKCyEWH9fF8uNiyD8swhUB69YrkSb/JkgFWHYq2RZ3Avibx0O5L8qwIk8lex4quPfFzI+ZBLUBmq0hK9C6Se4iCwkUjl0bjrwjUZ7SM0BLEnw6zlQVdUrOIc0cGPQ/U9E7eUyQemiXeg6pLNR8w84Af1xF7+C3aoNZj6+cxuacLR6ooQ+wVQFUpRXHICmDjHNDqAK8nUP6f7HBuwe55WzhwFH1VLKkaS7ehP7/Y4NP0f56RQkWTyWTAHlstW97oMYPuokygPsyG0xPJSsB6Ij9cP43AAf0tVxF4742FaCc+cwB+b/Y4CA6l7uIpOxUslSC/LO1d6BG3wCjs9VLVFR6/CqAo7iB9S+oaEMCXmaAn0tU1FFOJcsB5MHOBfcI0JoExcFEZTYYT7GBAjDJPsiE40Jr79ZfPmwWHsoHmWyVu0SCcfZhVciCGwHsvHlYJe0AsFW1DTpO/lSyvIrKC3bMhOmfcxOA7WYVbiKGBEpVNAU4Gm5YDwDtqSh7rbNBAQnUARSyn53pH7ZBep6VhmoZSKBGReX4652L63L/jIqePaeYpMhDAjU2GF8w29A/q6INNpjta1PcRFa50f0u3+7Rx7ZjRgBFibbaTYxzfW0lKpq5craC1mzQnorC1azWTTzn+9pUCSrKvcA/P6Ov7vqUkczBqQ7VMpDSU8nKbTC98pIc//hHbJDUh2oZSMAps8Hi+It8RnIAf3s24ZcCLPF8oMEGMynGAW0nQVuhWsmMnoJtFZsFqwM1bkJ5Nd5rybLV31DRJ/g6r2bTUWQGNGwwvXLv/gWAD3BRwWbeTah9bfUqKr8gn8adxL9og4RWZdXKXTsoD9XKAArZB2f4uzb4CCdBM5sZgLcqd6OKxld+Q40j2vorvsSpe00bvCEshmrVst9O2u8yYa0+eLxWsVlqgylCDRu8XYm8PSYtAdqZ0ae7iOmwmetrK41F62T/MoHkx6dLxE12EdNlU5KAWhssxkAx7ZRWHmzSk4pS+las0SdsVqqoPJWsOlSrlj0KDtDqtmMNAAlcydUr7di8T04lU69sGH/lzbefuO6swo71wdzLIHhyRciEzWFJlVtPuSNaP3SffsAGCQx9pHY66bOpVrlrw/QC7TqE9YtPu6sox7d2UFm3QfylzgbFD7WvTWf8vdXmHG8d4poGu84ACQ7XXr4FtkkOKptqX5umct+eMvMnLkk4susHBT5/Vp140GIzX+UucROVU6v05g667qCYHluW4AN1N9fSR7djE5ReqaOiWUM47e94uGoTIIXh4lT+aJ1QLcNmSV+bluzVp3j+Bss8hwUVJQxvPjzl0WZDRdTX1t5NlNAOEQouIQfZ2U1weOEluLm/lhFlgU2gMzxVj9VpvCSfcpp+EkjN2ykf+dWfU66do+Z3WxlRVlS5zW0w9xq5JD9WUpStAVLm3q0+gtJHm7iJfJXbwE2UPyWq5WwvOxeLDmHdUI1QiOHusvUqHt3Bm9362lSmm91EUYIpLbeik3+YEOZS2d1cATBqIXYZmRz8U9oL3sb8NdgEFVe2t8ESWu/la7rcTADErssYpRFcGn8YFxuYbA5vXycvy4POo7XcRExS0ddmYoNFWtmP782D7ft6ul8sV7vdZrPZ7VbLxX66Fr383q2Jv7qMaegm4i9AT+3qAI6baDMrD9IvTp57S9ZRZqb/ASZ5Uilc0KjZAAAAAElFTkSuQmCC"
        alt="User Avatar"
        className="user-avatar"
      />
      <h2>User Profile</h2>
      <form onSubmit={handleSubmit}>
        <div className="user-feilds-container">
          <Input
            label="Email"
            inputValue={formData.email}
            setInputValue={(value) => handleChange("email", value)}
            type="email"
            placeholder="Enter your email"
          />
          <Input
            label="Full Name"
            inputValue={formData.full_name}
            setInputValue={(value) => handleChange("full_name", value)}
            type="text"
            placeholder="Enter your full name"
          />
          <Select
            label="KYC Document Type"
            options={documentsTypesOptions}
            value={documentsTypesOptions?.find(
              (item) => item?.value === formData.kyc_document_type
            )}
            setValue={(value) =>
              handleChange("kyc_document_type", value?.value)
            }
            placeholder="Select ..."
            required={false}
          />
          <Input
            label="Referred By"
            inputValue={formData.referred_by}
            setInputValue={(value) => handleChange("referred_by", value)}
            type="text"
            placeholder="Enter referrer name (if any)"
            required={false}
          />
          <ImageUpload
            label="KYC Document Front"
            inputValue={formData.kyc_document_front}
            setInputValue={(file) =>
              handleFileChange("kyc_document_front", file)
            }
            allowedExtensions={["jpg", "jpeg", "png"]}
            required
          />
          <ImageUpload
            label="KYC Document Back"
            inputValue={formData.kyc_document_back}
            setInputValue={(file) =>
              handleFileChange("kyc_document_back", file)
            }
            allowedExtensions={["jpg", "jpeg", "png"]}
            required
          />
          <ImageUpload
            label="KYC Selfie Image"
            inputValue={formData.kyc_selfie_image}
            setInputValue={(file) => handleFileChange("kyc_selfie_image", file)}
            allowedExtensions={["jpg", "jpeg", "png"]}
            required
          />
        </div>

        <button type="submit" disabled={!isFormValid() || isSubmitting}>
          {isSubmitting ? "Submitting..." : "Submit"}
        </button>
      </form>
    </div>
  );
};

export default UserForm;
