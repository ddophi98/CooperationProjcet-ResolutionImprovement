import numpy as np
import tensorflow as tf
import cv2
import os
from PIL import Image


uploaded_img_path = "./static/uploaded_files/"
processed_img_path = "./static/processed_files/"
state = []

def interpolation(image):
    bicubic_lr = cv2.resize(
        image,
        dsize=(image.shape[1]//4, image.shape[0]//4), # 저해상도 이미지 크기로 설정
        interpolation=cv2.INTER_CUBIC # bicubic 설정
    )
    return bicubic_lr

def apply_srgan(image, srgan):
    image = tf.cast(image[np.newaxis, ...], tf.float32)
    sr = srgan.predict(image)
    sr = tf.clip_by_value(sr, 0, 255)
    sr = tf.round(sr)
    sr = tf.cast(sr, tf.uint8)
    return np.array(sr)[0]


def imageProcess():
    global state

    #작업하기 전 폴더 정리하기
    for f in os.scandir(processed_img_path):
        os.remove(f.path)

    srgan = tf.keras.models.load_model('./model/srgan_G.h5')
    file_list = os.listdir(uploaded_img_path)
    state = ['0' for _ in range(len(file_list))]

    #SRGAN 적용하기
    for idx, f in enumerate(file_list):
        img = cv2.imread(uploaded_img_path + f)
        img = cv2.cvtColor(img, cv2.COLOR_BGR2RGB)
        img = interpolation(img)
        sr_img_arr = apply_srgan(img, srgan)
        sr_img = Image.fromarray(sr_img_arr)
        sr_img.save(processed_img_path + f)
        state[idx] = '1'
