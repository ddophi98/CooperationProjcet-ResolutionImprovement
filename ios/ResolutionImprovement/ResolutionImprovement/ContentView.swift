//
//  ContentView.swift
//  ResolutionImprovement
//
//  Created by Yeongwoo Kim on 2022/02/03.
//

import SwiftUI

let screenWidth=UIScreen.main.bounds.size.width
let screenHeight=UIScreen.main.bounds.size.height

struct ContentView: View {
    @State var showImagePicker: Bool = false
    @State var image: Image? = nil
    
    var body: some View {
        VStack{
            Group{
                ZStack{
                    Image("blue")
                        .resizable()
                        .frame(height: screenHeight/10)
                    Text("Resolution Improvement")
                        .font(.system(size: screenHeight/25))
                        .foregroundColor(.white)
                }
                
                Spacer()
                
                ZStack{
                    Image("apricot")
                        .resizable()
                        .frame(height: screenHeight/12)
                    HStack{
                        Spacer()
                            .frame(width: screenWidth/20)
                        Text("About this App")
                            .font(.system(size: screenHeight/30))
                        Spacer()
                    }
                }
                
                Spacer()
                
                Text("Improve the resolution of your image or video for free! Our website uses deep-learning to create enhanced files. But you don't need to know about it in detail. Just follow the instructions on the website and you will be fine.")
                    .font(.system(size: screenHeight/40))
                    .frame(width: screenWidth/15*14)
                
                Spacer()
            }
            
            Group{
                ZStack{
                    Image("apricot")
                        .resizable()
                        .frame(height: screenHeight/12)
                    HStack{
                        Spacer()
                            .frame(width: screenWidth/20)
                        Text("Upload")
                            .font(.system(size: screenHeight/30))
                        Spacer()
                    }
                }
                
                Spacer()
                
                HStack{
                    Spacer()
                        .frame(width: screenWidth/20)
                    ZStack{
                        Image("white")
                            .resizable()
                            .frame(width: screenWidth/4, height: screenHeight/4)
                        
                        Image("gray")
                            .resizable()
                            .frame(width: screenWidth/4, height: screenHeight/20)
                        
                        Button(action: {
                            self.showImagePicker.toggle()
                        }) {
                            Text("파일 선택")
                                .foregroundColor(.white)
                        }
                    }
                    Spacer()
                    
                    image?
                        .resizable()
                        .aspectRatio(contentMode: .fit)
                        .frame(height: screenHeight/4)
                    
                    Spacer()
                }
                .sheet(isPresented: $showImagePicker){
                    ImagePicker(sourceType: .photoLibrary){image in
                        self.image=Image(uiImage: image)
                    }
                }
                
                Spacer()
                
                ZStack{
                    Image("bluegreen")
                        .resizable()
                        .frame(height: screenHeight/12)
                    VStack{
                        Text(verbatim: "Email: abcde@gmail.com")
                            .font(.system(size: screenHeight/50))
                        Text("Phone number: 000-0000-0000")
                            .font(.system(size: screenHeight/50))
                    }.foregroundColor(.white)
                }
            }
            
        }
    }
}

struct ContentView_Previews: PreviewProvider {
    static var previews: some View {
        ForEach(["iPhone 13 mini", "iPhone 13 Pro Max"], id: \.self){deviceName in
            ContentView()
                .previewDevice(PreviewDevice(rawValue: deviceName))
                .previewDisplayName(deviceName)
        }
    }
}
