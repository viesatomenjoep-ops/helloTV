from PIL import Image

def make_transparent(input_path, output_path):
    img = Image.open(input_path)
    img = img.convert("RGBA")
    datas = img.getdata()
    
    newData = []
    # Make white (and very light colors) transparent
    for item in datas:
        # if the pixel is white or almost white
        if item[0] > 240 and item[1] > 240 and item[2] > 240:
            newData.append((255, 255, 255, 0)) # transparent
        else:
            newData.append(item)
            
    img.putdata(newData)
    img.save(output_path, "PNG")

if __name__ == "__main__":
    input_file = "/Users/tomvanbiene/.gemini/antigravity/brain/81e1e78f-6b96-4950-9c6c-41e03c3d312e/media__1777822662780.png"
    output_file = "/Users/tomvanbiene/Downloads/HelloTV backend system/public/logo-transparent.png"
    make_transparent(input_file, output_file)
    print("Done")
